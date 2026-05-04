import { LevelContent } from "@/types/content";

export const level0: LevelContent = {
  id: 0,
  title: "AI Engineer Mindset",
  description: "Understand what AI Engineers build and how they think",
  estimatedHours: 1,
  lesson: `
## What is an AI Engineer?

An AI Engineer uses **existing models, APIs, and tools** to build useful AI-powered products. Unlike ML researchers who create new architectures, AI Engineers focus on:

- **Building** useful AI applications
- **Evaluating** quality systematically
- **Handling** failure cases gracefully
- **Shipping** safely to production
- **Monitoring** cost, latency, and quality

### The AI Engineering Stack

| Layer | Examples |
|-------|---------|
| Foundation Models | GPT-4, Claude, Llama, Gemini |
| Orchestration | Chains, agents, RAG pipelines |
| Evaluation | Golden datasets, LLM-as-judge, human review |
| Deployment | API design, caching, observability |

### AI Engineer vs ML Engineer vs Data Scientist

- **Data Scientist**: Analyzes data, builds dashboards, statistical models
- **ML Engineer**: Trains and deploys custom models, MLOps
- **AI Engineer**: Builds products using pre-trained models, prompt engineering, RAG, agents

### Key Principles

1. **Start with the user problem**, not the technology
2. **Evaluate everything** — if you can't measure it, you can't improve it
3. **Build incrementally** — small end-to-end projects beat grand plans
4. **Handle failures** — AI is probabilistic, always have fallbacks
5. **Monitor in production** — cost, latency, quality, safety
`,
  lab: null,
  quiz: [
    {
      question: "What is the primary focus of an AI Engineer?",
      options: [
        "Inventing new foundation model architectures",
        "Building applications using existing AI models and tools",
        "Writing SQL dashboards only",
        "Only conducting academic research"
      ],
      correctIndex: 1,
      explanation: "AI Engineers apply existing models and tools to build real products, not train models from scratch."
    },
    {
      question: "Which skill is most important for production AI apps?",
      options: [
        "Prompting only",
        "Evaluation, observability, reliability, and UX",
        "Memorizing equations",
        "Avoiding software engineering"
      ],
      correctIndex: 1,
      explanation: "Production AI needs systematic evaluation, monitoring, reliability, and good user experience."
    },
    {
      question: "What should you build while learning AI engineering?",
      options: [
        "Only read theory",
        "Small end-to-end projects",
        "Nothing until you're an expert",
        "Only watch videos"
      ],
      correctIndex: 1,
      explanation: "Building small, complete projects is the fastest way to develop practical AI engineering skills."
    },
    {
      question: "How does an AI Engineer differ from an ML Engineer?",
      options: [
        "AI Engineers train custom models from scratch",
        "AI Engineers build products on top of pre-trained models",
        "There is no difference",
        "AI Engineers only work with databases"
      ],
      correctIndex: 1,
      explanation: "AI Engineers leverage pre-trained models (GPT-4, Claude, etc.) while ML Engineers train custom models."
    }
  ]
};
