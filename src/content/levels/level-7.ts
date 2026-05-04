import { LevelContent } from "@/types/content";

export const level7: LevelContent = {
  id: 7,
  title: "Evaluation + Safety",
  description: "Create an AI eval rubric and safety checks",
  estimatedHours: 6,
  lesson: `
## Evaluating AI Systems

If you can't measure it, you can't improve it. Evaluation is the most underrated AI engineering skill.

### Evaluation Types

| Type | What | When |
|------|------|------|
| Unit tests for prompts | Assert expected outputs for known inputs | Every prompt change |
| Golden dataset | Curated set of (input, expected_output) pairs | Regression testing |
| LLM-as-judge | Use a model to score another model's output | Scale evaluation |
| Human review | Manual quality checks | High-stakes decisions |

### Key Metrics

- **Keyword match** — does the answer contain expected terms?
- **Semantic similarity** — is the meaning close to the reference?
- **Faithfulness** — is the answer grounded in provided context?
- **Relevance** — does it actually answer the question?
- **Toxicity/safety** — is the output appropriate?

### Safety Considerations

1. **Prompt injection** — input trying to override system instructions
2. **Hallucination** — confident but false statements
3. **Bias** — unfair treatment of demographic groups
4. **Privacy** — leaking personal information
5. **Unsafe actions** — agents performing destructive operations

### Building an Eval Pipeline

1. Define evaluation criteria
2. Create golden test cases
3. Run model against test cases
4. Score with automated metrics
5. Review failures manually
6. Track metrics over time
`,
  lab: {
    instructions: "Build an evaluator that scores AI answers using keyword matching and tracks results across multiple test cases.",
    starterCode: `import numpy as np

eval_cases = [
    {
        "question": "What is RAG?",
        "expected_keywords": ["retrieval", "context", "generate"],
        "answer": "RAG retrieves relevant context before generating an answer."
    },
    {
        "question": "What does LLMOps track?",
        "expected_keywords": ["latency", "cost", "quality"],
        "answer": "LLMOps tracks latency, cost, quality, safety, and failures."
    }
]

# TODO 1: Implement keyword_eval that returns score per case
def keyword_eval(case):
    return {"question": "", "hits": 0, "total": 0, "score": 0}  # fix this

# TODO 2: Run evaluator on all cases and compute average score
eval_results = []  # fix this
avg_eval_score = 0  # fix this

print("Results:", eval_results)
print("Average score:", avg_eval_score)
`,
    solutionCode: `import numpy as np

eval_cases = [
    {
        "question": "What is RAG?",
        "expected_keywords": ["retrieval", "context", "generate"],
        "answer": "RAG retrieves relevant context before generating an answer."
    },
    {
        "question": "What does LLMOps track?",
        "expected_keywords": ["latency", "cost", "quality"],
        "answer": "LLMOps tracks latency, cost, quality, safety, and failures."
    }
]

def keyword_eval(case):
    answer = case["answer"].lower()
    hits = sum(1 for kw in case["expected_keywords"] if kw.lower() in answer)
    return {
        "question": case["question"],
        "hits": hits,
        "total": len(case["expected_keywords"]),
        "score": round(100 * hits / len(case["expected_keywords"]), 2)
    }

eval_results = [keyword_eval(c) for c in eval_cases]
avg_eval_score = np.mean([r["score"] for r in eval_results])

print("Results:", eval_results)
print("Average score:", avg_eval_score)
`,
    assertions: `assert avg_eval_score >= 70, "Average eval score should be >= 70"
assert all("score" in r for r in eval_results), "Each result must have a score"
assert len(eval_results) >= 2, "Must have at least two eval cases"`,
    requiredPackages: ["numpy"],
    hints: [
      "Count keyword hits: sum(1 for kw in keywords if kw.lower() in answer.lower())",
      "Score = 100 * hits / total_keywords",
      "Use np.mean() for average across all cases"
    ]
  },
  quiz: [
    { question: "Why create golden datasets?", options: ["To regression-test AI quality", "To decorate notebooks", "To reduce RAM only", "To avoid users"], correctIndex: 0, explanation: "Golden datasets let you catch quality regressions when prompts or models change." },
    { question: "What is prompt injection?", options: ["Input trying to override system instructions", "A database index", "A GPU error", "A CSS issue"], correctIndex: 0, explanation: "Prompt injection attempts to hijack the model by injecting instructions via user input." },
    { question: "Which production metric matters for AI apps?", options: ["Latency, cost, quality, safety", "Only font size", "Only code lines", "Only page views"], correctIndex: 0, explanation: "Production AI needs monitoring across multiple dimensions: speed, cost, quality, and safety." }
  ]
};
