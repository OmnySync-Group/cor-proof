# Changelog

All notable changes to the COR Proof (Chain-of-Reasoning Proof) specification
will be documented in this file.

This project adheres to Semantic Versioning and follows the principles of
[Keep a Changelog](https://keepachangelog.com/).

---

## [1.0.0] — 2026-02-22

### Added
- Reference validator (`validator/validate.js`) with AJV draft 2020-12
- Strong invalid examples: type violation, empty evidence, malformed reasoning atom
- `minItems: 1` constraints on `evidence` and `reasoning_atoms` arrays
- Level 1 scope boundary documentation (schema accommodates L2–L4; v1.0 specifies L1 only)
- `package.json` with correct Apache-2.0 license and project metadata

### Changed
- Version alignment: schema `$id`, `cor_version`, docs all reference `1.0.0`
- README rewritten for v1.0 with Quick Start, repo structure, and scope clarity
- Fixed example typos: `support_claims` → `supports_claims`, `metada` → `metadata`
- Clarified open vs. proprietary boundary language

### Removed
- Release candidate status markers

---

## [1.0.0-rc.1] — 2025-12-15

### Added
- Explicit separation between open COR Proof standard and proprietary / enterprise components
- Human-in-the-loop (Keeper) escalation hooks at Level 3 (non-normative)
- Contradiction detection and classification (`data_conflict`, `logic_conflict`, `norm_conflict`)
- Clear open vs. enterprise boundary language
- Expanded examples covering L1 compliance
- Clarified terminology for model-, human-, and hybrid-generated proofs

### Changed
- Simplified core reasoning structure to reduce developer implementation burden
- Clarified DAG (Directed Acyclic Graph) constraints for reasoning chains
- Refined evidence registry and citation linkage rules
- Improved validation language for deterministic schema checking

### Deprecated
- Implicit or recursive reasoning references not represented as explicit DAG nodes
- Unstructured or free-form reasoning text without atomized steps

### Removed
- Experimental or speculative features not required for baseline compliance
- Any normative references to proprietary modules or enterprise logic

---

## [1.0.0-rc] — 2025-11-01

### Added
- Initial multi-level compliance model (L1–L3)
- Evidence registry abstraction
- Basic contradiction signaling
- Early validation rules

---

## Versioning Notes

- Patch versions may clarify language or examples without breaking compatibility.
- Major versions will introduce breaking changes and require migration guidance.

---

## Future Releases (Planned)

- 1.1.0 — Optional extension points and profiles
- 2.0.0 — Major evolution (if required)
