/**
 * COR Proof L1 — OpenAI API Wrapper Demo
 *
 * What this demo includes:
 * - Calls an LLM via OpenAI Responses API
 * - Forces COR Proof JSON via Structured Outputs (json_schema)
 * - Validates with AJV (+ ajv-formats for date-time)
 * - Retries with validation error feedback if needed
 *
 * What this demo intentionally does NOT include:
 * - Keeper / governance logic
 * - Escalation thresholds
 * - Adjudication / trust scoring
 *
 * References:
 * - OpenAI Structured Outputs guide (text.format json_schema)
 * - OpenAI Responses API
 */

import fs from "fs";
import path from "path";
import process from "process";
import OpenAI from "openai";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

// ---------- Config ----------
const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini"; // structured outputs supported in newer models
const MAX_ATTEMPTS = Number(process.env.COR_MAX_ATTEMPTS || 3);

const REPO_ROOT = process.cwd(); // 04_Validator is the repo root in this setup
const SCHEMA_PATH = path.join(REPO_ROOT, "schema", "cor-proof.schema.json"); // schema is at repo root
const OUT_PATH = path.join(REPO_ROOT, "demo", "demo-l1-ibuprofen.json");   // write output to repo root

// ---------- Load COR Schema ----------
const corSchema = JSON.parse(fs.readFileSync(SCHEMA_PATH, "utf-8"));

function makeOpenAIStrictSchema(schema) {
  const s = structuredClone(schema);

  const visit = (node) => {
    if (!node || typeof node !== "object") return;

    // Treat this node as an object schema if:
    // - it explicitly says type: "object", OR
    // - it has "properties" (typical object schema)
    const isObjectLike =
      node.type === "object" ||
      (node.properties && typeof node.properties === "object" && !Array.isArray(node.properties));

    if (isObjectLike) {
      node.type = "object";

      // OpenAI strict mode requires this to exist and be false
      if (node.additionalProperties === undefined) node.additionalProperties = false;

      // If the schema doesn't define properties, make it an explicit empty object
      if (!node.properties || typeof node.properties !== "object" || Array.isArray(node.properties)) {
        node.properties = {};
      }

      // OpenAI strict mode requires required to exactly match properties keys
      const keys = Object.keys(node.properties);
      node.required = keys; // [] is valid when properties is {}
    }

    // Recurse
    if (node.properties && typeof node.properties === "object" && !Array.isArray(node.properties)) {
      for (const k of Object.keys(node.properties)) visit(node.properties[k]);
    }
    if (node.items) visit(node.items);

    for (const key of ["allOf", "anyOf", "oneOf"]) {
      if (Array.isArray(node[key])) node[key].forEach(visit);
    }

    if (node.not) visit(node.not);

    for (const key of ["if", "then", "else"]) {
      if (node[key]) visit(node[key]);
    }

    if (node.$defs && typeof node.$defs === "object") {
      for (const k of Object.keys(node.$defs)) visit(node.$defs[k]);
    }
    if (node.definitions && typeof node.definitions === "object") {
      for (const k of Object.keys(node.definitions)) visit(node.definitions[k]);
    }
  };

  visit(s);
  return s;
}

// ---------- AJV Validator ----------
const ajv = new Ajv2020({
  allErrors: true,
  strict: false,
});

addFormats(ajv); // enables "date-time", etc.
const validate = ajv.compile(corSchema);

console.log("AJV ready (draft2020 validator loaded");

// ---------- OpenAI Client ----------
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ---------- Prompt ----------
function buildUserTask() {
  return [
    "Task: Answer the question and produce a COR Proof Level 1 object.",
    "",
    'Question: "Is ibuprofen an NSAID?"',
    "",
    "Requirements:",
    "- Output MUST conform to the provided COR Proof JSON Schema (Level 1).",
    "- Keep evidence minimal but real: include at least 1 evidence item describing a reputable source (e.g., drug label, clinical reference).",
    "- Keep reasoning_atoms minimal: 1–3 atoms is fine.",
    "- If you are uncertain, reflect uncertainty using the schema's uncertainty fields (do not invent facts).",
    "- Do not include any governance/escalation logic (no Keeper concepts).",
  ].join("\n");
}

function buildSystemInstructions() {
  return `
You must output a single JSON object that conforms EXACTLY to the provided JSON Schema.

IMPORTANT:
- The schema has been adapted for strict structured output: every object property is treated as REQUIRED.
- Therefore, you MUST include every field defined in the schema, even if it would normally be optional.

If a field is not applicable or unknown, do NOT invent meaning or details.
Instead use:
- "" (empty string) for string fields
- 0 for numeric fields (only if unknown/not applicable)
- false for boolean fields (only if unknown/not applicable)
- [] (empty array) for arrays
- {} (empty object) for objects
- null only if the schema explicitly allows null

Strictness rules:
- Do not add any extra keys not present in the schema.
- All objects must be “closed” (no additionalProperties).
- Return JSON only. No markdown, no commentary, no code fences.
`;
}

// ---------- Retry wrapper ----------
function formatAjvErrors(errors) {
  if (!errors || !errors.length) return "No AJV errors.";
  return errors
    .map((e) => `- ${e.instancePath || "/"} ${e.message || ""}`.trim())
    .join("\n");
}

async function generateCorProofWithRetries() {
  let lastErrors = null;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const repairHint =
      attempt === 1
        ? ""
        : [
            "",
            "The previous JSON failed schema validation. Fix the issues and output JSON again.",
            "Validation errors:",
            formatAjvErrors(lastErrors),
          ].join("\n");

    // Structured Outputs: force schema adherence via text.format json_schema
    // Docs: text: { format: { type: "json_schema", strict: true, schema: {...} } }
    const openaiSchema = makeOpenAIStrictSchema(corSchema);

    const response = await openai.responses.create({
      model: MODEL,
      instructions: buildSystemInstructions(),
      input: buildUserTask() + repairHint,
      text: {
        format: {
          type: "json_schema",
          name: "cor_proof_l1",
          strict: true,
          schema: openaiSchema,
        },
      },
    });

    // Extract the model's text output (should be JSON string in structured mode)
    const outputText =
      response.output_text ||
      (response.output?.find((i) => i.type === "message")?.content?.[0]?.text ?? "");

    let parsed;
    try {
      parsed = JSON.parse(outputText);
    } catch (err) {
      lastErrors = [
        {
          instancePath: "",
          message: `Output was not valid JSON parseable: ${String(err)}`,
        },
      ];
      continue;
    }

    const ok = validate(parsed);
    if (ok) {
      return parsed;
    }

    lastErrors = validate.errors || [];
  }

  throw new Error(
    `Failed to generate a valid COR Proof after ${MAX_ATTEMPTS} attempts.\n` +
      formatAjvErrors(lastErrors)
  );
}

// ---------- Main ----------
(async () => {
  if (!process.env.OPENAI_API_KEY) {
    console.error("Missing OPENAI_API_KEY. Set it in your environment first.");
    process.exitCode = 1;
    return;
  }

  console.log(`Model: ${MODEL}`);
  console.log(`Schema: ${SCHEMA_PATH}`);
  console.log(`Output: ${OUT_PATH}`);

  try {
    const cor = await generateCorProofWithRetries();

    // Persist artifact
    fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
    fs.writeFileSync(OUT_PATH, JSON.stringify(cor, null, 2), "utf-8");

    console.log("✅ Generated + validated COR Proof.");
    console.log(`Saved: ${OUT_PATH}`);
  } catch (err) {
    console.error("❌ Demo failed:");
    console.error(err?.stack || String(err));
    process.exit(2);

   
  }
})();
