import { LevelContent } from "@/types/content";

export const level9: LevelContent = {
  id: 9,
  title: "Capstone Project",
  description: "Build and evaluate a portfolio-worthy AI project",
  estimatedHours: 10,
  lesson: `
## Capstone: Build Your Portfolio Project

Choose one project and build it end-to-end.

### Project Ideas

#### 1. Crash Rate Investigation Agent
- **Input**: App version
- **Tools**: Firebase/BigQuery data source
- **Output**: Slack alert with risk summary and evidence
- **Portfolio value**: Very high for mobile/CI background

#### 2. AI News Digest PWA
- **Input**: Sources + topics
- **Tools**: RSS/search APIs + LLM summarizer
- **Output**: Daily digest with categories and importance score

#### 3. PR Review Assistant
- **Input**: GitHub PR
- **Tools**: GitHub API, static analysis, test results
- **Output**: Code review comments, risk score, size impact

#### 4. RAG Knowledge Assistant
- **Input**: Docs, PDFs, tickets, incidents
- **Tools**: Embeddings, vector DB, citations
- **Output**: Grounded answers with source references

### Evaluation Rubric

| Area | Points | What to demonstrate |
|------|-------:|-------------------|
| Clear problem + users | 10 | Who needs this and why |
| Working app/API | 20 | Functional end-to-end system |
| LLM/retrieval/tool integration | 20 | AI is core, not bolted on |
| Evaluation dataset + metrics | 20 | Systematic quality measurement |
| Safety/fallbacks | 10 | Handles edge cases gracefully |
| Observability/cost tracking | 10 | Logs, metrics, cost awareness |
| Demo/README/video | 10 | Others can understand and run it |

### Tips

1. Start with the **simplest version** that demonstrates the core idea
2. Add evaluation early — don't bolt it on at the end
3. Document your decisions and trade-offs
4. Include a live demo or video walkthrough
`,
  lab: {
    instructions: "Score your capstone project against the rubric. Fill in points for each area (honest self-assessment).",
    starterCode: `# Capstone self-evaluation rubric
# Fill in your scores (0 to max for each area)

capstone = {
    "clear_problem_users": 0,       # max 10
    "working_app_or_api": 0,        # max 20
    "llm_retrieval_or_tools": 0,    # max 20
    "evaluation_metrics": 0,        # max 20
    "safety_fallbacks": 0,          # max 10
    "observability_cost": 0,        # max 10
    "demo_readme_video": 0,         # max 10
}

# TODO: Implement capstone_score function
def capstone_score(rubric):
    return 0  # fix this — return total out of 100

score = capstone_score(capstone)
print(f"Capstone score: {score}/100")
`,
    solutionCode: `capstone = {
    "clear_problem_users": 8,
    "working_app_or_api": 18,
    "llm_retrieval_or_tools": 16,
    "evaluation_metrics": 15,
    "safety_fallbacks": 7,
    "observability_cost": 7,
    "demo_readme_video": 8,
}

def capstone_score(rubric):
    return sum(rubric.values())

score = capstone_score(capstone)
print(f"Capstone score: {score}/100")
`,
    assertions: `assert callable(capstone_score), "capstone_score must be a function"
assert 0 <= score <= 100, "Score must be between 0 and 100"
assert score >= 70, "Capstone score should be >= 70 to pass"`,
    requiredPackages: [],
    hints: [
      "Fill in realistic scores based on your project progress",
      "capstone_score just sums all the values",
      "You need a total of 70+ to pass"
    ]
  },
  quiz: [
    { question: "What makes a strong AI capstone project?", options: ["Working system with evaluation and documentation", "Just a README", "Only theory", "Copy-pasted tutorial"], correctIndex: 0, explanation: "A strong capstone demonstrates a working system with systematic evaluation and clear documentation." },
    { question: "Why include evaluation in your capstone?", options: ["To demonstrate systematic quality measurement", "To make it longer", "To avoid writing code", "To use more GPU"], correctIndex: 0, explanation: "Evaluation shows you can measure and improve AI quality — a core AI engineering skill." },
    { question: "What is the most important thing to start with?", options: ["The user problem you're solving", "The latest framework", "The most tokens", "The biggest model"], correctIndex: 0, explanation: "Always start with the problem and user need, then choose the right technology to solve it." }
  ]
};
