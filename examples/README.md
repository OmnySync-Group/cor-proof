# COR Proof Examples

This directory contains example COR Proof objects used for testing and demonstration.

## Valid Examples (`valid/`)

- `L1_basic_claim.json`
  A minimal valid COR Proof Level 1 object. Medical triage domain.

## Invalid Examples (`invalid/`)

Each invalid example tests a specific schema enforcement behavior:

- `L1_missing_required.json` — Missing required field (`cor_version`)
- `L1_wrong_type.json` — Wrong type (`level` as string instead of integer)
- `L1_empty_evidence.json` — Empty `evidence` array (violates `minItems: 1`)
- `L1_bad_reasoning_atom.json` — Missing required subfields in `reasoning_atoms`

## Usage

These files are referenced by:
- The reference validator (`validator/validate.js`)
- Demo workflows
- Documentation examples

They are illustrative only and not normative.

## Validation

```bash
# Validate all valid examples
node validator/validate.js examples/valid/L1_basic_claim.json

# Test invalid examples (each should fail)
node validator/validate.js examples/invalid/L1_wrong_type.json
```
