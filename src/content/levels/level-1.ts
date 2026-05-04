import { LevelContent } from "@/types/content";

export const level1: LevelContent = {
  id: 1,
  title: "Python + Data Basics",
  description: "Clean data and compute metrics with Python, NumPy, and Pandas",
  estimatedHours: 6,
  lesson: `
## Python for AI Engineering

Python is the lingua franca of AI. You need fluency in:

### Core Data Tools

- **NumPy** — fast numerical arrays, vectorized operations
- **Pandas** — DataFrames for tabular data, cleaning, aggregation
- **JSON** — the universal data interchange format for AI APIs

### Data Cleaning Patterns

Real-world data is messy. Common operations:

1. **Handle missing values**: \`fillna()\`, \`dropna()\`
2. **Type conversion**: \`astype()\`, \`pd.to_datetime()\`
3. **Filtering**: boolean indexing, \`.query()\`
4. **Aggregation**: \`.groupby()\`, \`.agg()\`

### Key Metrics for AI Apps

- **Success rate** = successful_responses / total_requests
- **P95 latency** = 95th percentile response time (95% of requests are faster)
- **Error rate** = failed_requests / total_requests

### Why This Matters

Every AI system generates telemetry data. You need to:
- Clean and prepare data for analysis
- Compute metrics to measure system health
- Identify trends and anomalies
`,
  lab: {
    instructions: "Clean a dataset of AI app events and compute key metrics: fill missing values, calculate success rate, and compute p95 latency.",
    starterCode: `import numpy as np
import pandas as pd

# Raw events from an AI-powered app
raw_events = [
    {"user_id": "u1", "event": "app_opened", "version": "1.0.0", "latency_ms": 120},
    {"user_id": "u1", "event": "ai_answered", "version": "1.0.0", "latency_ms": 950},
    {"user_id": "u2", "event": "app_opened", "version": "1.0.0", "latency_ms": None},
    {"user_id": "u2", "event": "ai_failed", "version": "1.0.0", "latency_ms": 2100},
    {"user_id": "u3", "event": "app_opened", "version": "1.1.0", "latency_ms": 100},
    {"user_id": "u3", "event": "ai_answered", "version": "1.1.0", "latency_ms": 700},
]

df = pd.DataFrame(raw_events)

# TODO 1: Fill missing latency_ms with the median latency
# Store result in df["latency_ms_clean"]
df["latency_ms_clean"] = None  # fix this

# TODO 2: Compute success rate = ai_answered / (ai_answered + ai_failed)
success_rate = 0  # fix this

# TODO 3: Compute p95 latency from the cleaned column
p95_latency = 0  # fix this

print("Success rate:", success_rate)
print("P95 latency:", p95_latency)
print(df)
`,
    solutionCode: `import numpy as np
import pandas as pd

raw_events = [
    {"user_id": "u1", "event": "app_opened", "version": "1.0.0", "latency_ms": 120},
    {"user_id": "u1", "event": "ai_answered", "version": "1.0.0", "latency_ms": 950},
    {"user_id": "u2", "event": "app_opened", "version": "1.0.0", "latency_ms": None},
    {"user_id": "u2", "event": "ai_failed", "version": "1.0.0", "latency_ms": 2100},
    {"user_id": "u3", "event": "app_opened", "version": "1.1.0", "latency_ms": 100},
    {"user_id": "u3", "event": "ai_answered", "version": "1.1.0", "latency_ms": 700},
]

df = pd.DataFrame(raw_events)

df["latency_ms_clean"] = df["latency_ms"].fillna(df["latency_ms"].median())

answered = (df["event"] == "ai_answered").sum()
failed = (df["event"] == "ai_failed").sum()
success_rate = answered / (answered + failed)

p95_latency = np.percentile(df["latency_ms_clean"], 95)

print("Success rate:", success_rate)
print("P95 latency:", p95_latency)
print(df)
`,
    assertions: `assert df["latency_ms_clean"].isna().sum() == 0, "No missing latency values"
assert abs(success_rate - (2/3)) < 1e-9, "Correct success rate (should be 2/3)"
assert p95_latency > 0, "P95 latency should be positive"`,
    requiredPackages: ["numpy", "pandas"],
    hints: [
      "Use df['col'].fillna(df['col'].median()) to fill missing values",
      "Count events with (df['event'] == 'ai_answered').sum()",
      "Use np.percentile(array, 95) for p95"
    ]
  },
  quiz: [
    {
      question: "Which Pandas object is best for table-like data?",
      options: ["DataFrame", "Tuple", "String", "Set"],
      correctIndex: 0,
      explanation: "DataFrame is Pandas' primary data structure for tabular data with rows and columns."
    },
    {
      question: "Why fill missing values before computing metrics?",
      options: [
        "To hide bugs",
        "To avoid broken or biased calculations",
        "To make data smaller",
        "To remove columns"
      ],
      correctIndex: 1,
      explanation: "Missing values can cause NaN results or biased statistics if not handled properly."
    },
    {
      question: "What does p95 latency mean?",
      options: [
        "Average latency",
        "95% of requests are at or below this latency",
        "Fastest request",
        "Total latency"
      ],
      correctIndex: 1,
      explanation: "P95 is the 95th percentile — 95% of requests complete within this time."
    }
  ]
};
