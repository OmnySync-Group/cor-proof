# COR Proof (Chain-of-Reasoning Proof) — Open Specification

---

## Status: v1.0.0

---

## What is COR Proof?

COR Proof is an open, structured specification for capturing, validating, and auditing reasoning processes in AI and human–AI systems.

It defines a machine-verifiable and human-readable format for representing claims, evidence, and reasoning structure, supporting schema-based validation and cross-system verification across multiple domains.

---

## What COR Proof Solves

Modern AI systems can produce fluent outputs without verifiable reasoning structure. COR Proof addresses this by:

- Making reasoning explicit, structured, and inspectable
- Binding claims to declared evidence
- Encoding reasoning as atomic inference steps
- Enabling independent validation via JSON Schema
- Supporting tooling, review, and interoperability workflows

COR Proof is model-agnostic and applies to:
- LLM outputs
- RAG pipelines
- Agentic systems
- Tool-calling workflows
- Human-in-the-loop review

---

## What COR Proof Does Not Do

- Determine whether a claim is true
- Replace human judgment or peer review
- Enforce model behavior
- Perform inference, scoring, or ranking

It provides a structured artifact for reasoning to be examined, validated, and compared.

---

## Scope: Level 1 — Universal Structure Layer

This release (v1.0.0) formally specifies **COR Proof Level 1** behavior.

Level 1 provides structural transparency: it exposes claims, evidence, assumptions, and reasoning steps in a deterministic, machine-verifiable format.

**Level 1 intentionally does NOT:**
- Determine whether a claim is true
- Resolve subjective or normative disagreements
- Enforce semantic correctness beyond structure
- Score, rank, or evaluate reasoning quality

**Level 1 DOES provide:**
- Structural integrity validation
- Explicit reasoning step tracing
- Evidence traceability
- Deterministic pass/fail validation outcomes

The schema structurally accommodates higher levels (L2–L4) for forward compatibility. Fields such as `ledger` and `contradictions` are present in the schema but are **not normative for Level 1**. Higher-level specifications will be published separately.

**Core design principle:** *Transparency is universal. Truth is contextual.*

---

## Intended Audience

COR Proof is intended for:
- AI researchers and engineers exploring verifiable reasoning
- Developers building auditability, traceability, or trust layers into AI systems
- Standards-oriented contributors evaluating reasoning schemas
- Institutions experimenting with transparent decision records

It is not a replacement for model training, alignment methods, or inference engines.

---

## Quick Start (60 seconds)

### Inspect the schema

```
schema/cor-proof.schema.json
```

This is the normative definition of a COR Proof Level 1 document.

### Validate a known-good example

```bash
cd validator
npm install
node validate.js ../examples/valid/L1_basic_claim.json
```

Expected result: `✅ VALID`

### Test a known-invalid example

```bash
node validate.js ../examples/invalid/L1_wrong_type.json
```

Expected result: `❌ INVALID` (schema violation with specific error)

---

## COR Proof Demo — Live LLM

The demo directory includes a reference wrapper that:

- Prompts an LLM to emit a COR Proof Level 1 object
- Enforces schema compliance at generation time via structured outputs
- Validates the result using AJV (JSON Schema draft 2020-12)

```bash
node demo/openai_l1_wrapper.mjs
```

Output: `demo/demo-l1-ibuprofen.json`

See [demo/README.md](demo/README.md) for details.

---

## Repository Structure

```
cor-proof/
├── README.md                          Project overview & usage
├── NOTICE.md                          Attribution & notices
├── LICENSE.md                         Apache License 2.0
├── CONTRIBUTING.md                    Contribution guidelines
├── CHANGELOG.md                       Version history
├── IMPLEMENTATIONS.md                 Community implementations (reserved)
├── SECURITY.md                        Security policy
├── package.json                       Node.js package manifest
│
├── schema/
│   └── cor-proof.schema.json          Authoritative COR Proof schema
│
├── examples/
│   ├── README.md                      Example documentation
│   ├── valid/
│   │   └── L1_basic_claim.json        Minimal valid L1 artifact
│   └── invalid/
│       ├── L1_missing_required.json   Missing cor_version (required field)
│       ├── L1_wrong_type.json         level as string (type violation)
│       ├── L1_empty_evidence.json     Empty evidence array (minItems)
│       └── L1_bad_reasoning_atom.json Missing required atom subfields
│
├── demo/
│   ├── README.md                      Demo documentation
│   ├── openai_l1_wrapper.mjs          Live LLM → COR Proof wrapper
│   └── demo-l1-ibuprofen.json         Sample demo output
│
├── validator/
│   ├── README.md                      Validator documentation
│   └── validate.js                    Reference AJV validator
│
└── test-suite/
    └── README.md                      Conformance tests (reserved)
```

---

## Conformance & Implementations

- The schema enables structured validation to support verifiable reasoning artifacts
- The reference validator demonstrates correct validation behavior
- The test suite defines expected pass/fail outcomes

Community implementations (SDKs, services, tooling) will be listed in [IMPLEMENTATIONS.md](IMPLEMENTATIONS.md).

---

## Release Notes (v1.0.0)

Changes from Release Candidate:

- Version alignment across schema, examples, and documentation
- Added reference validator (`validator/validate.js`)
- Added strong invalid examples covering multiple failure modes
- Added `minItems: 1` constraints on `evidence` and `reasoning_atoms` arrays
- Fixed example field name typos (`supports_claims`, `metadata`)
- Cleaned `package.json` (license, naming, description)
- Clarified Level 1 scope boundary (schema accommodates L2–L4; v1.0 specifies L1 only)

---

## License

This project is licensed under the Apache License 2.0. See [LICENSE.md](LICENSE.md).

## Notice

See [NOTICE.md](NOTICE.md) for attribution and copyright information.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Security

See [SECURITY.md](SECURITY.md) for the security policy.

---

## WHY THIS PROJECT EXISTS:
My academic and professional endeavors have mandated that I "explain the why" — in front of architecture critique boards, confirmation briefs to my leadership, my Master's thesis, and truly most of the time in everyday life. To that end, when I started using AI more heavily in 2025 and began to see the growing chorus of "how can we trust AI" and “AI hallucinates or drifts" — I became convinced there has to be a mechanism to help minimize these concerns. That is when I began to investigate what Chain-of-Thought (CoT) was so I could find out why it was not providing confidence in AI answers and workflows. It turns out that CoT just shows "how" the AI came to its conclusion, not "why."

This is when I set out in early 2025 to find the "why" behind AI responses and workflows. Enter the Chain-of-Reasoning (COR) Proof, which requires AI to "explain itself" through structured 'reasoning atoms' — inspectable steps bound to declared evidence, captured at inference time, not asserted after the fact.

Now, don't get me wrong — the irony of using AI to help explain itself is not lost on me. But I believe that over a year of disciplined iteration to produce a valid and functional COR Proof reasoning artifact is exactly the discipline this problem demands. The repo speaks for itself — but I firmly believe in the value of community improvement and support. I am employed full-time with an active family life — and I commit every spare moment during the week and weekends to improve the outcomes of COR Proof.

On that note, let's dive right into it and if you'd like to know a little more about me, I have posted my info in the CONTRIBUTING.md file of this repo.

Thanks,

Vince

---

## Attribution

COR Proof is developed and maintained by **OmnySync Group LLC** as part of the **Stake The Truth** initiative.

Contact: founder@omnysyncai.com

*Reasoning you can inspect. Proof you can verify.*
