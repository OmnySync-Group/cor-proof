# Contributing to COR Proof

Thank you for your interest in contributing to COR Proof.

This project defines an open technical standard, so contributions are evaluated with an emphasis on clarity, correctness, interoperability, and long-term stability.

---

## Scope of Contributions

We welcome contributions in the following areas:

### In Scope
- Specification clarifications
- Editorial improvements
- JSON Schema enhancements (backwards-compatible)
- Example COR Proofs
- Validator bug fixes or optimizations
- Test cases and edge-case coverage
- Documentation improvements

### Out of Scope (for this repository)
- Proprietary validation engines
- Keeper / governance logic
- Closed-source confidence scoring systems
- Astral / Companion orchestration components

These are intentionally excluded to preserve the open-core boundary.

---

## Contribution Process

1. Open an Issue
   - Describe the problem, proposal, or question
   - Reference relevant sections of the spec if applicable

2. Fork the Repository
   - Create a feature branch from `main`

3. Make Changes
   - Keep changes focused and atomic
   - Maintain backwards compatibility whenever possible

4. Submit a Pull Request
   - Clearly describe what changed and why
   - Link to any relevant issues
   - Include examples or tests if appropriate

---

## Specification Guidelines

When proposing changes to the specification:

- Prefer additive changes over breaking ones
- Avoid overfitting to a single model or vendor
- Keep semantics implementation-agnostic
- Ensure fields are:
  - Explicit
  - Typed
  - Machine-verifiable
- Document any new fields thoroughly

---

## Schema Changes

Changes to cor-proof.schema.json must:
- Validate existing examples
- Not break prior compliant COR Proofs
- Include updated examples if new fields are added

Breaking changes require:
- Clear justification
- Version bump discussion
- Maintainer approval

---

## Code Style

- JSON must be valid and consistently formatted
- Markdown should be clear and concise
- Reference implementations should favor clarity over cleverness

---

## Review & Governance

All contributions are reviewed by the maintainers.

Acceptance criteria include:
- Alignment with COR Proof principles
- Technical correctness
- Long-term maintainability
- Impact on ecosystem interoperability

Maintainers reserve the right to request revisions or decline contributions that do not align with the project’s goals.

---

## Legal

By submitting a contribution, you agree that:
- Your contribution is provided under the Apache License 2.0
- You have the right to submit the work
- You are not knowingly contributing proprietary or restricted material

---

## Contact

For questions or guidance:
- Open a GitHub issue
- Or contact: founder@omnysyncai.com
