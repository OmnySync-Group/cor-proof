#!/usr/bin/env node

/**
 * COR Proof L1 — Reference Schema Validator
 *
 * Validates a COR Proof JSON artifact against the authoritative schema.
 *
 * Usage:
 *   node validator/validate.js <path-to-artifact.json>
 *
 * Exit codes:
 *   0 = Valid
 *   1 = Invalid (schema violation)
 *   2 = Runtime error (file not found, JSON parse error, etc.)
 *
 * What this validator DOES:
 *   - Structural compliance checking against COR Proof JSON Schema
 *   - Required field verification
 *   - Type enforcement
 *   - Format validation (date-time, etc.)
 *
 * What this validator does NOT do:
 *   - Evaluate truth or correctness of claims
 *   - Perform semantic reasoning
 *   - Enforce policy, ethics, or safety constraints
 *   - Replace human or institutional judgment
 */

const fs = require("fs");
const path = require("path");
const Ajv2020 = require("ajv/dist/2020");
const addFormats = require("ajv-formats");

// ---------- Config ----------
const SCHEMA_PATH = path.join(__dirname, "..", "schema", "cor-proof.schema.json");

// ---------- CLI ----------
const args = process.argv.slice(2);

if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
  console.log(`
COR Proof L1 — Reference Schema Validator

Usage:
  node validator/validate.js <artifact.json>

Exit codes:
  0  Valid COR Proof artifact
  1  Invalid (schema violations found)
  2  Runtime error

Options:
  --help, -h    Show this help message
  --verbose     Show full error details
`);
  process.exit(args.length === 0 ? 2 : 0);
}

const verbose = args.includes("--verbose");
const artifactPath = args.find((a) => !a.startsWith("--"));

if (!artifactPath) {
  console.error("Error: No artifact file specified.");
  process.exit(2);
}

// ---------- Load schema ----------
let schema;
try {
  schema = JSON.parse(fs.readFileSync(SCHEMA_PATH, "utf-8"));
} catch (err) {
  console.error(`Error loading schema: ${err.message}`);
  process.exit(2);
}

// ---------- Load artifact ----------
let artifact;
try {
  const raw = fs.readFileSync(path.resolve(artifactPath), "utf-8");
  artifact = JSON.parse(raw);
} catch (err) {
  console.error(`Error loading artifact: ${err.message}`);
  process.exit(2);
}

// ---------- Validate ----------
const ajv = new Ajv2020({
  allErrors: true,
  strict: false,
});
addFormats(ajv);

const validate = ajv.compile(schema);
const valid = validate(artifact);

if (valid) {
  console.log(`✅ VALID  ${artifactPath}`);
  if (artifact.cor_version) {
    console.log(`   cor_version: ${artifact.cor_version}`);
  }
  if (artifact.level !== undefined) {
    console.log(`   level: ${artifact.level}`);
  }
  if (artifact.claim && artifact.claim.text) {
    const claimPreview =
      artifact.claim.text.length > 80
        ? artifact.claim.text.substring(0, 77) + "..."
        : artifact.claim.text;
    console.log(`   claim: "${claimPreview}"`);
  }
  process.exit(0);
} else {
  console.log(`❌ INVALID  ${artifactPath}`);
  console.log("");

  const errors = validate.errors || [];
  console.log(`   ${errors.length} validation error(s):`);
  console.log("");

  errors.forEach((err, i) => {
    const pointer = err.instancePath || "/";
    console.log(`   ${i + 1}. ${pointer}  ${err.message}`);
    if (verbose && err.params) {
      console.log(`      params: ${JSON.stringify(err.params)}`);
    }
  });

  process.exit(1);
}
