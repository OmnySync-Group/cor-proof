[DRAFT — KEEPER REVIEW REQUIRED]

# ARTIFACT_README — Governance Constraint Demo

---

## What This Artifact Is

`governance_constraint_demo.json` is a **reference/demo COR Proof Level 1 artifact** produced by
OmnySync Group LLC. It answers the governance challenge question:

> What governance constraint on AI behavior, if removed, would pose the greatest risk to human oversight?

It is designed as a worked example to show what the COR Proof format looks like when applied to a
governance reasoning problem.

**This artifact is NOT:**
- An official statement from Anthropic, OpenAI, Google, xAI, Meta, or any AI provider
- A representation of any provider's internal policy or system constraints
- A description of actual internal AI model behavior
- A disclosure of proprietary system instructions or confidential policy text

**This artifact IS:**
- A structural reasoning demonstration
- A reference implementation of the COR Proof L1 format
- A demo use case showing how governance reasoning can be structured and inspected

---

## What Fields to Look at First

Open `governance_constraint_demo.json` in any JSON editor or viewer.

| Field | What it tells you |
|---|---|
| `claim` | The single counterfactual claim being argued — read this first |
| `context` | Labeling and framing for the artifact (REFERENCE/DEMO, not provider policy) |
| `evidence` | Five public premises the reasoning is grounded in (E-001 through E-005) |
| `reasoning_atoms` | Eight inference steps from evidence to claim (RA-001 through RA-008) |
| `contradictions` | The strongest opposing argument (CONTRA-001) and why it is unresolved |
| `metadata.confidence_band` | The confidence score and its explicit stated basis |
| `metadata.assumptions` | Five explicit scope-bounding assumptions |
| `metadata.limitations` | Five explicit limitations on what the artifact does and does not claim |

---

## How to Run the Validator Locally

From the repo root:

```bash
npm install
node validator/validate.js examples/valid/governance_constraint_demo.json
```

Expected output:
```
✅ VALID  examples/valid/governance_constraint_demo.json
   cor_version: 1.0.0
   level: 1
   claim: "If the publicly documented operational constraint requiring mandatory..."
```

---

## What the Validator Checks

The validator checks **structural compliance only** — whether the artifact satisfies the COR Proof
JSON Schema (`schema/cor-proof.schema.json`). It verifies:

- All required fields are present
- Field types are correct
- Arrays meet minimum item requirements
- Date-time strings are properly formatted
- Enum values are from the allowed set

The validator does **NOT**:
- Evaluate whether the claim is true
- Assess the quality of the reasoning
- Verify the accuracy of evidence citations
- Replace human review of content

Schema-valid does not mean factually correct or ready to publish. Human review is always required.

---

## How the Reasoning Is Structured

The artifact follows a linear inference chain:

```
E-001, E-003 → RA-001 (define the constraint)
E-004, RA-001 → RA-002 (domain amplifies harm magnitude)
E-001, E-003 → RA-003 (define "materially removed")
RA-001+2+3   → RA-004 (gate removal opens error propagation path)
E-002+E-004  → RA-005 (post-hoc audit cannot substitute)
RA-004+5     → RA-006 (oversight becomes reactive, not preventive)
E-005, RA-006 → RA-007 (COUNTERCONSIDERATION: monitoring may partially compensate)
RA-004+5+6+7 → RA-008 (synthesis: net risk increases, accounting for counterconsideration)
                → C-001 (the counterfactual claim)
```

The counterconsideration (RA-007, CONTRA-001) is included intentionally. An honest structural
argument engages the strongest opposing case rather than omitting it.

---

## Artifact Status

- **Schema validity:** Expected PASS (run validator to confirm)
- **Truth validation:** NOT performed — this is a structural demonstration
- **Human review:** REQUIRED before publication — `[DRAFT — KEEPER REVIEW REQUIRED]`

This artifact was generated during the OmnySync Group LLC HN Readiness Sprint (2026-05-30).
