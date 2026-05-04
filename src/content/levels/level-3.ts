import { LevelContent } from "@/types/content";

export const level3: LevelContent = {
  id: 3,
  title: "LLM APIs + Prompt Engineering",
  description: "Build prompt patterns and validate structured outputs",
  estimatedHours: 6,
  lesson: `
## Working with LLM APIs

Every major AI provider offers APIs: OpenAI, Anthropic, Google, etc. The core pattern is the same.

### Message Roles

| Role | Purpose |
|------|---------|
| system/developer | Sets behavior, constraints, output format |
| user | The actual request or input |
| assistant | Model's response |

### Prompt Engineering Techniques

1. **Zero-shot** — just describe the task
2. **Few-shot** — provide examples in the prompt
3. **Chain-of-thought** — ask the model to reason step by step
4. **Structured output** — request JSON with a specific schema

### Structured Output Pattern

Always validate LLM outputs:
1. Request JSON in the prompt
2. Parse the response
3. Validate against expected schema
4. Handle parse failures with retries or fallbacks

### Guardrails

- **Input validation** — reject/sanitize harmful inputs
- **Output validation** — verify schema, content safety
- **Rate limiting** — control cost and abuse
- **Fallbacks** — default response when AI fails
`,
  lab: {
    instructions: "Create a prompt template for support ticket classification and validate the structured JSON output.",
    starterCode: `import json

# TODO 1: Build a prompt that asks for JSON output with keys: category, priority, reason
# Valid categories: tech, payment, delivery, account
def build_support_prompt(ticket):
    return ""  # fix this

# Mock LLM (simulates an API call)
def mock_llm(prompt):
    p = prompt.lower()
    if "payment" in p or "card" in p or "refund" in p:
        return json.dumps({"category": "payment", "priority": "high", "reason": "Payment-related issue"})
    if "crash" in p or "freeze" in p:
        return json.dumps({"category": "tech", "priority": "high", "reason": "App stability issue"})
    return json.dumps({"category": "account", "priority": "medium", "reason": "General account issue"})

# TODO 2: Validate that the output is valid JSON with required keys and valid category
def validate_output(s):
    return False, {}  # fix this

prompt = build_support_prompt("My card payment failed and refund is missing")
response = mock_llm(prompt)
ok, parsed = validate_output(response)

print("Prompt:", prompt)
print("Response:", response)
print("Valid:", ok, "Parsed:", parsed)
`,
    solutionCode: `import json

def build_support_prompt(ticket):
    return f"""You are a support triage AI.
Classify the ticket into one of: tech, payment, delivery, account.
Return strict JSON with keys: category, priority, reason.

Ticket: {ticket}"""

def mock_llm(prompt):
    p = prompt.lower()
    if "payment" in p or "card" in p or "refund" in p:
        return json.dumps({"category": "payment", "priority": "high", "reason": "Payment-related issue"})
    if "crash" in p or "freeze" in p:
        return json.dumps({"category": "tech", "priority": "high", "reason": "App stability issue"})
    return json.dumps({"category": "account", "priority": "medium", "reason": "General account issue"})

def validate_output(s):
    try:
        obj = json.loads(s)
        required = {"category", "priority", "reason"}
        valid_categories = {"tech", "payment", "delivery", "account"}
        ok = required.issubset(obj.keys()) and obj["category"] in valid_categories
        return ok, obj
    except Exception:
        return False, {}

prompt = build_support_prompt("My card payment failed and refund is missing")
response = mock_llm(prompt)
ok, parsed = validate_output(response)

print("Prompt:", prompt)
print("Response:", response)
print("Valid:", ok, "Parsed:", parsed)
`,
    assertions: `assert "JSON" in prompt or "json" in prompt, "Prompt should request JSON output"
assert ok == True, "Output should validate successfully"
assert parsed.get("category") == "payment", "Category should be payment"`,
    requiredPackages: [],
    hints: [
      "Include 'Return strict JSON' in your prompt template",
      "Use json.loads() to parse, then check required keys exist",
      "Check that category is in the valid set"
    ]
  },
  quiz: [
    { question: "Why ask for JSON output?", options: ["Easier parsing and automation", "Looks fancy", "Always cheaper", "Avoids evaluation"], correctIndex: 0, explanation: "JSON enables programmatic parsing and validation of AI outputs." },
    { question: "What is few-shot prompting?", options: ["No examples", "Providing examples in the prompt", "Training a model", "Deleting context"], correctIndex: 1, explanation: "Few-shot prompting includes example inputs and outputs to guide the model." },
    { question: "What should you do with LLM outputs before using in code?", options: ["Trust blindly", "Validate and handle failures", "Print only", "Ignore schema"], correctIndex: 1, explanation: "LLM outputs are probabilistic — always validate structure and content." }
  ]
};
