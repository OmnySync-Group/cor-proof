Live LLM → COR Proof Demo

This repository includes a reference demo that:

* Prompts an LLM to emit a COR Proof Level 1 object
* Enforces schema compliance at generation time
* Validates the result using AJV (JSON Schema draft 2020-12)

Run:

node demo/openai\_l1\_wrapper.mjs

Output:

demo/demo-l1-ibuprofen.json

