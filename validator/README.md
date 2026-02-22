# COR Proof Schema Validator (AJV)

This directory contains a reference JSON Schema validator for COR Proof v1.0.0.

## Purpose
- Validate structural compliance with the COR Proof JSON Schema
- Ensure required fields, types, and formats are present
- Provide deterministic pass/fail results with clear error reporting

## What This Validator Does NOT Do
- Evaluate truth or correctness of claims
- Perform semantic reasoning
- Enforce policy, ethics, or safety constraints
- Replace human or institutional judgment

## Requirements
- Node.js >= 18
- npm

## Install

```bash
cd validator
npm install
```

## Usage

```bash
# Validate a single artifact
node validate.js <path-to-artifact.json>

# Examples
node validate.js ../examples/valid/L1_basic_claim.json      # → VALID
node validate.js ../examples/invalid/L1_wrong_type.json      # → INVALID

# Verbose mode (shows full error details)
node validate.js --verbose ../examples/invalid/L1_bad_reasoning_atom.json
```

## Exit Codes
- `0` — Valid COR Proof artifact
- `1` — Invalid (schema violations found)
- `2` — Runtime error (file not found, JSON parse error, etc.)

## Status
Reference validator only. Not normative.
