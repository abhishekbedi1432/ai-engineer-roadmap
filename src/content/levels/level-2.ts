import { LevelContent } from "@/types/content";

export const level2: LevelContent = {
  id: 2,
  title: "ML Fundamentals",
  description: "Train and evaluate a classifier with scikit-learn",
  estimatedHours: 6,
  lesson: `
## Machine Learning Basics for AI Engineers

You don't need to be an ML researcher, but you must understand core concepts.

### Supervised Learning Pipeline

1. **Collect data** — labeled examples (input, output)
2. **Split data** — train set (learn) + test set (evaluate)
3. **Choose a model** — Logistic Regression, Random Forest, etc.
4. **Train** — model learns patterns from training data
5. **Evaluate** — measure performance on unseen test data

### Key Metrics

| Metric | What it measures |
|--------|-----------------|
| Accuracy | % of correct predictions overall |
| Precision | Of predicted positives, how many are correct |
| Recall | Of actual positives, how many did we find |
| F1 Score | Harmonic mean of precision and recall |

### When Accuracy Lies

With imbalanced classes (99% negative, 1% positive), a model that always predicts negative gets 99% accuracy but catches zero positive cases. Use precision/recall instead.

### Text Classification Pipeline

For NLP tasks like support ticket routing:
1. **Vectorize text** — CountVectorizer or TF-IDF converts text to numbers
2. **Train classifier** — LogisticRegression, SVM, etc.
3. **Evaluate** — classification_report shows per-class metrics
`,
  lab: {
    instructions: "Train a text classifier to categorize support tickets into tech/payment/delivery categories using scikit-learn.",
    starterCode: `from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score, classification_report

texts = [
    "app crashes after login", "payment failed at checkout", "order delayed again",
    "cannot reset password", "refund not received", "app freezes on home screen",
    "card payment declined", "delivery partner late", "login otp not received",
    "wallet refund missing", "application crashes on launch", "checkout payment error"
]
labels = [
    "tech", "payment", "delivery",
    "tech", "payment", "tech",
    "payment", "delivery", "tech",
    "payment", "tech", "payment"
]

# TODO 1: Split data into train/test (test_size=0.25, random_state=42, stratify=labels)
X_train, X_test, y_train, y_test = None, None, None, None  # fix this

# TODO 2: Create a Pipeline with CountVectorizer and LogisticRegression
clf = None  # fix this

# TODO 3: Fit the pipeline and predict on test data
preds = []  # fix this
acc = 0  # fix this

print("Accuracy:", acc)
`,
    solutionCode: `from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score, classification_report

texts = [
    "app crashes after login", "payment failed at checkout", "order delayed again",
    "cannot reset password", "refund not received", "app freezes on home screen",
    "card payment declined", "delivery partner late", "login otp not received",
    "wallet refund missing", "application crashes on launch", "checkout payment error"
]
labels = [
    "tech", "payment", "delivery",
    "tech", "payment", "tech",
    "payment", "delivery", "tech",
    "payment", "tech", "payment"
]

X_train, X_test, y_train, y_test = train_test_split(texts, labels, test_size=0.25, random_state=42, stratify=labels)

clf = Pipeline([
    ("vectorizer", CountVectorizer()),
    ("model", LogisticRegression(max_iter=1000))
])

clf.fit(X_train, y_train)
preds = clf.predict(X_test)
acc = accuracy_score(y_test, preds)

print("Accuracy:", acc)
print(classification_report(y_test, preds, zero_division=0))
`,
    assertions: `assert clf is not None and hasattr(clf, "predict"), "Pipeline must have predict method"
assert 0 <= acc <= 1, "Accuracy must be between 0 and 1"
assert len(preds) == len(y_test), "Predictions must match test size"`,
    requiredPackages: ["numpy", "pandas", "scikit-learn"],
    hints: [
      "Use train_test_split(texts, labels, test_size=0.25, random_state=42, stratify=labels)",
      "Pipeline takes a list of (name, transformer) tuples",
      "Call clf.fit(X_train, y_train) then clf.predict(X_test)"
    ]
  },
  quiz: [
    { question: "Why use a test set?", options: ["To evaluate generalization", "To train faster", "To delete data", "To avoid metrics"], correctIndex: 0, explanation: "The test set measures how well the model generalizes to unseen data." },
    { question: "What is overfitting?", options: ["Model performs well only on training data", "Model has no data", "Model is too cheap", "Model is deployed"], correctIndex: 0, explanation: "Overfitting means the model memorized training data but fails on new data." },
    { question: "For imbalanced classes, accuracy alone can be misleading. Which metric helps?", options: ["Precision/Recall", "File size", "CPU name", "Line count"], correctIndex: 0, explanation: "Precision and recall give per-class performance, revealing issues accuracy hides." }
  ]
};
