import { LevelContent } from "@/types/content";

export const level8: LevelContent = {
  id: 8,
  title: "Deployment + LLMOps",
  description: "Design a production-ready AI system",
  estimatedHours: 6,
  lesson: `
## Production AI Systems

Shipping AI to production requires more than a working prompt.

### Production Checklist

| Area | Requirements |
|------|-------------|
| API Contract | Versioned endpoints, input/output schemas |
| Validation | Input sanitization, output schema validation |
| Evaluation | Golden dataset, automated regression tests |
| Logging | Request/response logging, tool call traces |
| Monitoring | Latency p50/p95, error rate, cost per request |
| Fallbacks | Graceful degradation when AI fails |
| Human Review | Escalation path for low-confidence results |
| Privacy | PII handling, data retention policies |
| Cost Control | Token budgets, model selection per task |
| Versioning | Prompt versions, model versions, A/B testing |

### LLMOps Best Practices

1. **Version your prompts** — track changes, enable rollback
2. **Cache responses** — semantic caching for common queries
3. **Rate limit** — protect against abuse and cost spikes
4. **A/B test** — compare prompt/model variants on real traffic
5. **Feedback loops** — collect user feedback, retrain/adjust
6. **Cost tracking** — per-request cost attribution

### Architecture Patterns

- **Gateway pattern** — centralized proxy for all LLM calls
- **Fallback chain** — try primary model, fall back to cheaper/faster one
- **Async processing** — queue heavy AI tasks, return results later
- **Streaming** — stream tokens for better perceived latency
`,
  lab: {
    instructions: "Create a production readiness checklist and score your system's readiness. Fill in each item as True/False.",
    starterCode: `# TODO: Fill in each item as True or False based on your system
production_checklist = {
    "api_contract": False,
    "input_validation": False,
    "output_schema_validation": False,
    "eval_dataset": False,
    "logging": False,
    "latency_monitoring": False,
    "cost_monitoring": False,
    "fallback_model_or_message": False,
    "human_review_path": False,
    "privacy_review": False,
}

# TODO: Implement readiness_score function
def readiness_score(checklist):
    return 0  # fix this

score = readiness_score(production_checklist)
print("Production readiness score:", score)
`,
    solutionCode: `production_checklist = {
    "api_contract": True,
    "input_validation": True,
    "output_schema_validation": True,
    "eval_dataset": True,
    "logging": True,
    "latency_monitoring": True,
    "cost_monitoring": True,
    "fallback_model_or_message": True,
    "human_review_path": True,
    "privacy_review": True,
}

def readiness_score(checklist):
    return round(100 * sum(checklist.values()) / len(checklist), 2)

score = readiness_score(production_checklist)
print("Production readiness score:", score)
`,
    assertions: `assert score >= 70, "Readiness score should be >= 70 (mark at least 7 items True)"
assert callable(readiness_score), "readiness_score must be a function"
assert 0 <= score <= 100, "Score must be between 0 and 100"`,
    requiredPackages: [],
    hints: [
      "Set items to True as you implement each production requirement",
      "Score = 100 * sum(checklist.values()) / len(checklist)",
      "You need at least 7 of 10 items True to pass"
    ]
  },
  quiz: [
    { question: "Why version prompts?", options: ["To track quality changes and rollback safely", "To make text longer", "To avoid deployment", "To remove tests"], correctIndex: 0, explanation: "Prompt versioning lets you track which prompt versions perform best and rollback if quality drops." },
    { question: "What should happen if the AI service fails?", options: ["Fallback path or graceful error", "Crash the whole app", "Ignore user", "Delete logs"], correctIndex: 0, explanation: "Always provide a fallback — a cached response, simpler model, or helpful error message." },
    { question: "What should you monitor in production AI?", options: ["Cost, latency, quality, failures, safety", "Only CPU temperature", "Only daily active users", "Nothing"], correctIndex: 0, explanation: "Production AI needs multi-dimensional monitoring: cost, speed, quality, errors, and safety." }
  ]
};
