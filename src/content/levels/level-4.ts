import { LevelContent } from "@/types/content";

export const level4: LevelContent = {
  id: 4,
  title: "Embeddings + Semantic Search",
  description: "Build a mini vector search engine",
  estimatedHours: 6,
  lesson: `
## Embeddings and Semantic Search

Embeddings convert text into dense numerical vectors that capture meaning.

### How Embeddings Work

- Similar texts produce vectors that are close together
- "How do I reset my password?" and "I forgot my login" have similar embeddings
- Cosine similarity measures how aligned two vectors are (1.0 = identical, 0 = unrelated)

### Vector Search Pipeline

1. **Embed documents** — convert each document to a vector
2. **Store vectors** — in a vector database (Pinecone, Weaviate, Chroma, etc.)
3. **Embed query** — convert the search query to a vector
4. **Find nearest neighbors** — cosine similarity ranks results
5. **Return top-k** — most relevant documents

### TF-IDF as Lightweight Embeddings

For learning, TF-IDF (Term Frequency-Inverse Document Frequency) works as a simple embedding:
- Converts text to sparse vectors based on word importance
- Good baseline before using neural embeddings
- Built into scikit-learn

### Production Embedding Models

| Provider | Model | Dimensions |
|----------|-------|-----------|
| OpenAI | text-embedding-3-small | 1536 |
| Anthropic | via Voyage AI | 1024 |
| Google | text-embedding-004 | 768 |
| Open source | sentence-transformers | varies |
`,
  lab: {
    instructions: "Build a semantic search engine using TF-IDF vectorization and cosine similarity.",
    starterCode: `import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

docs = [
    "RAG uses retrieval to provide context to a language model.",
    "Prompt engineering improves model instructions and output quality.",
    "Vector databases store embeddings for semantic search.",
    "LLMOps includes monitoring, cost tracking, evaluation, and deployment.",
    "Agents use tools to take actions and complete multi-step tasks."
]

# TODO 1: Create a TfidfVectorizer and fit_transform the docs
vectorizer = None  # fix this
doc_vectors = None  # fix this

# TODO 2: Implement search function
def search(query, top_k=2):
    # Transform query, compute cosine similarity, return top_k results
    return []  # fix this

results = search("how do I retrieve context for an LLM?", top_k=2)
for rank, (idx, doc, score) in enumerate(results):
    print(f"{rank+1}. [{score:.3f}] {doc}")
`,
    solutionCode: `import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

docs = [
    "RAG uses retrieval to provide context to a language model.",
    "Prompt engineering improves model instructions and output quality.",
    "Vector databases store embeddings for semantic search.",
    "LLMOps includes monitoring, cost tracking, evaluation, and deployment.",
    "Agents use tools to take actions and complete multi-step tasks."
]

vectorizer = TfidfVectorizer()
doc_vectors = vectorizer.fit_transform(docs)

def search(query, top_k=2):
    q_vec = vectorizer.transform([query])
    sims = cosine_similarity(q_vec, doc_vectors)[0]
    ranked = np.argsort(sims)[::-1][:top_k]
    return [(int(i), docs[i], float(sims[i])) for i in ranked]

results = search("how do I retrieve context for an LLM?", top_k=2)
for rank, (idx, doc, score) in enumerate(results):
    print(f"{rank+1}. [{score:.3f}] {doc}")
`,
    assertions: `assert len(results) == 2, "Should return top_k=2 results"
assert "retriev" in results[0][1].lower() or "RAG" in results[0][1], "Top result should be retrieval-related"
assert all(isinstance(r[2], float) for r in results), "Each result must have a float similarity score"`,
    requiredPackages: ["numpy", "scikit-learn"],
    hints: [
      "TfidfVectorizer().fit_transform(docs) creates document vectors",
      "vectorizer.transform([query]) transforms a new query",
      "cosine_similarity returns a matrix — use [0] for the first query"
    ]
  },
  quiz: [
    { question: "What is an embedding?", options: ["Text represented as a vector", "A database password", "A UI button", "A Python loop"], correctIndex: 0, explanation: "Embeddings are dense vector representations of text that capture semantic meaning." },
    { question: "What does cosine similarity compare?", options: ["Vector direction similarity", "File age", "Model cost only", "Token count only"], correctIndex: 0, explanation: "Cosine similarity measures the angle between two vectors — closer to 1.0 means more similar." },
    { question: "Why use vector search in RAG?", options: ["To retrieve relevant context", "To delete documents", "To avoid prompts", "To train GPUs"], correctIndex: 0, explanation: "Vector search finds the most semantically relevant documents to include as context." }
  ]
};
