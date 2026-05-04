import { LevelContent } from "@/types/content";

export const level5: LevelContent = {
  id: 5,
  title: "RAG: Retrieval-Augmented Generation",
  description: "Build a retrieval + answer generation pipeline",
  estimatedHours: 8,
  lesson: `
## Retrieval-Augmented Generation

RAG is the most common AI engineering pattern. Instead of relying solely on the model's training data, you **retrieve relevant documents** and include them as context.

### Why RAG?

- **Reduces hallucination** — answers grounded in real documents
- **Up-to-date knowledge** — no need to retrain the model
- **Cheaper than fine-tuning** — just update the document store
- **Auditable** — you can cite sources

### RAG Pipeline

1. **Chunk** — split documents into manageable pieces (500-1000 tokens)
2. **Embed** — convert chunks to vectors
3. **Store** — put vectors in a vector database
4. **Retrieve** — find top-k relevant chunks for a query
5. **Generate** — pass query + retrieved chunks to LLM

### Evaluation Metrics for RAG

| Metric | What it measures |
|--------|-----------------|
| Context Relevance | Are retrieved chunks relevant to the question? |
| Faithfulness | Is the answer grounded in the retrieved context? |
| Answer Correctness | Is the answer factually correct? |

### Common RAG Failures

- **Irrelevant retrieval** — wrong chunks retrieved
- **Lost in the middle** — model ignores middle context
- **Hallucination despite context** — model makes up facts
- **Chunking issues** — important info split across chunks
`,
  lab: {
    instructions: "Build a toy RAG pipeline with a knowledge base, TF-IDF retrieval, and a mock answer generator.",
    starterCode: `import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

knowledge_base = [
    {"id": "doc1", "text": "Abhyanga is an Ayurvedic oil massage practice often used for relaxation and wellbeing."},
    {"id": "doc2", "text": "RAG means Retrieval-Augmented Generation. It retrieves documents before generating an answer."},
    {"id": "doc3", "text": "AI agents can call tools such as search, calculators, databases, and APIs."},
    {"id": "doc4", "text": "LLMOps tracks latency, cost, quality, safety, and failures in production AI applications."},
]

kb_texts = [d["text"] for d in knowledge_base]
rag_vectorizer = TfidfVectorizer()
kb_vectors = rag_vectorizer.fit_transform(kb_texts)

# TODO 1: Implement retrieve function
def retrieve(query, top_k=2):
    return []  # fix this — return list of dicts with id, text, score

# TODO 2: Implement generate_answer that includes source references
def generate_answer(query, contexts):
    return ""  # fix this — include [docN] references

query = "What is RAG?"
contexts = retrieve(query)
answer = generate_answer(query, contexts)

print("Contexts:", contexts)
print("Answer:", answer)
`,
    solutionCode: `import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

knowledge_base = [
    {"id": "doc1", "text": "Abhyanga is an Ayurvedic oil massage practice often used for relaxation and wellbeing."},
    {"id": "doc2", "text": "RAG means Retrieval-Augmented Generation. It retrieves documents before generating an answer."},
    {"id": "doc3", "text": "AI agents can call tools such as search, calculators, databases, and APIs."},
    {"id": "doc4", "text": "LLMOps tracks latency, cost, quality, safety, and failures in production AI applications."},
]

kb_texts = [d["text"] for d in knowledge_base]
rag_vectorizer = TfidfVectorizer()
kb_vectors = rag_vectorizer.fit_transform(kb_texts)

def retrieve(query, top_k=2):
    q_vec = rag_vectorizer.transform([query])
    sims = cosine_similarity(q_vec, kb_vectors)[0]
    ranked = np.argsort(sims)[::-1][:top_k]
    return [{**knowledge_base[i], "score": float(sims[i])} for i in ranked]

def generate_answer(query, contexts):
    context_text = "\\n".join([f"[{c['id']}] {c['text']}" for c in contexts])
    return f"Based on retrieved context:\\n{context_text}\\n\\nAnswer: RAG retrieves relevant documents and uses them as context before generating an answer."

query = "What is RAG?"
contexts = retrieve(query)
answer = generate_answer(query, contexts)

print("Contexts:", contexts)
print("Answer:", answer)
`,
    assertions: `assert len(contexts) == 2, "Should retrieve 2 contexts"
assert any("RAG" in c["text"] for c in contexts), "Should retrieve RAG-related document"
assert "[doc" in answer, "Answer should include source document IDs"
assert "retriev" in answer.lower(), "Answer should mention retrieval"`,
    requiredPackages: ["numpy", "scikit-learn"],
    hints: [
      "Transform query with rag_vectorizer.transform([query])",
      "Use cosine_similarity and np.argsort to rank results",
      "Include [docN] references in the generated answer string"
    ]
  },
  quiz: [
    { question: "What is the main purpose of RAG?", options: ["Add relevant external context before answering", "Make prompts shorter only", "Avoid retrieval", "Replace databases completely"], correctIndex: 0, explanation: "RAG retrieves relevant documents and includes them as context for the LLM." },
    { question: "What is a common RAG failure?", options: ["Retrieving irrelevant chunks", "Having documents", "Using citations", "Chunking text"], correctIndex: 0, explanation: "If retrieval returns wrong chunks, the LLM generates answers from irrelevant context." },
    { question: "Which metric evaluates if the answer is grounded in retrieved context?", options: ["Faithfulness", "Laptop color", "Screen size", "Code font"], correctIndex: 0, explanation: "Faithfulness measures whether the answer can be supported by the retrieved documents." }
  ]
};
