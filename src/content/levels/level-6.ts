import { LevelContent } from "@/types/content";

export const level6: LevelContent = {
  id: 6,
  title: "Agents + Tool Calling",
  description: "Build a tool-calling mini-agent",
  estimatedHours: 8,
  lesson: `
## AI Agents

An agent is an AI system that **chooses actions** to accomplish a goal. Unlike a simple prompt-response, agents can:

- **Decide** which tool to use
- **Execute** tool calls (search, calculate, API calls)
- **Observe** results
- **Iterate** until the task is complete

### Agent Loop

\`\`\`
User task -> Think -> Choose tool -> Execute -> Observe result -> Think again -> ... -> Final answer
\`\`\`

### Common Tools

| Tool | Use case |
|------|----------|
| Calculator | Math operations |
| Search | Web/document lookup |
| Database | Query structured data |
| API calls | External services (Slack, GitHub, etc.) |
| Code executor | Run generated code |

### Safety Considerations

- **Bounded goals** — agents should have clear stopping conditions
- **Tool permissions** — restrict which tools agents can access
- **Human-in-the-loop** — require approval for destructive actions
- **Observability** — log every tool call and decision
- **Cost limits** — cap API calls and compute

### Agent Frameworks

- LangGraph, CrewAI, AutoGen for complex multi-agent systems
- Often simpler to build a custom agent loop for specific use cases
`,
  lab: {
    instructions: "Build a mini agent that chooses between a calculator tool and a document search tool based on the user's task.",
    starterCode: `import re
import json
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Tool 1: Calculator
def calculator_tool(expression):
    allowed = re.fullmatch(r"[0-9+\\-*/(). ]+", expression)
    if not allowed:
        return "Invalid expression"
    return str(eval(expression, {"__builtins__": {}}))

# Tool 2: Document search
kb = ["LLMOps tracks latency, cost, quality, safety, and failures.",
      "RAG retrieves documents before generating answers.",
      "Agents use tools to complete multi-step tasks."]
_vec = TfidfVectorizer()
_vecs = _vec.fit_transform(kb)

def search_docs_tool(query):
    q = _vec.transform([query])
    sims = cosine_similarity(q, _vecs)[0]
    best = int(np.argmax(sims))
    return kb[best]

tools = {"calculator": calculator_tool, "search_docs": search_docs_tool}

# TODO: Implement the agent that picks the right tool
def mini_agent(task):
    # Return {"tool": name, "input": input, "output": output}
    return {"tool": "", "input": "", "output": ""}  # fix this

result1 = mini_agent("calculate 12 * 8 + 4")
result2 = mini_agent("what does LLMOps track?")
print("Result 1:", result1)
print("Result 2:", result2)
`,
    solutionCode: `import re
import json
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def calculator_tool(expression):
    allowed = re.fullmatch(r"[0-9+\\-*/(). ]+", expression)
    if not allowed:
        return "Invalid expression"
    return str(eval(expression, {"__builtins__": {}}))

kb = ["LLMOps tracks latency, cost, quality, safety, and failures.",
      "RAG retrieves documents before generating answers.",
      "Agents use tools to complete multi-step tasks."]
_vec = TfidfVectorizer()
_vecs = _vec.fit_transform(kb)

def search_docs_tool(query):
    q = _vec.transform([query])
    sims = cosine_similarity(q, _vecs)[0]
    best = int(np.argmax(sims))
    return kb[best]

tools = {"calculator": calculator_tool, "search_docs": search_docs_tool}

def mini_agent(task):
    lower = task.lower()
    if "calculate" in lower or re.search(r"\\d+\\s*[+\\-*/]\\s*\\d+", lower):
        expr = re.findall(r"[0-9+\\-*/(). ]+", task)[0].strip()
        return {"tool": "calculator", "input": expr, "output": tools["calculator"](expr)}
    else:
        return {"tool": "search_docs", "input": task, "output": tools["search_docs"](task)}

result1 = mini_agent("calculate 12 * 8 + 4")
result2 = mini_agent("what does LLMOps track?")
print("Result 1:", result1)
print("Result 2:", result2)
`,
    assertions: `assert result1["tool"] == "calculator", "Should select calculator for math"
assert result1["output"] == "100", "12 * 8 + 4 = 100"
assert result2["tool"] == "search_docs", "Should select search for questions"
assert "LLMOps" in result2["output"], "Should find LLMOps document"`,
    requiredPackages: ["numpy", "scikit-learn"],
    hints: [
      "Check if the task contains 'calculate' or has a math expression pattern",
      "Use re.search to detect patterns like '12 * 8'",
      "Extract the math expression with re.findall"
    ]
  },
  quiz: [
    { question: "What makes an AI workflow agentic?", options: ["It can choose actions/tools toward a goal", "It has a logo", "It always uses a GPU", "It only summarizes text"], correctIndex: 0, explanation: "Agents autonomously decide which actions to take to accomplish a goal." },
    { question: "Why restrict tool permissions?", options: ["For safety and control", "To make it slower", "To avoid logs", "To remove tests"], correctIndex: 0, explanation: "Unrestricted tool access could lead to destructive or costly unintended actions." },
    { question: "What is the agent loop pattern?", options: ["Think -> Act -> Observe -> Repeat", "Just print output", "Delete all files", "Skip evaluation"], correctIndex: 0, explanation: "Agents iterate through thinking, acting, and observing results until the task is complete." }
  ]
};
