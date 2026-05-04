# AI Engineer Roadmap

A self-paced learning portal to become a production-ready AI Engineer in 8 weeks. Interactive Python labs run in your browser via Pyodide — no setup needed.

## What's Inside

| Level | Topic | Type |
|-------|-------|------|
| 0 | AI Engineer Mindset | Quiz |
| 1 | Python + Data Basics | Lab + Quiz |
| 2 | ML Fundamentals (scikit-learn) | Lab + Quiz |
| 3 | LLM APIs + Prompt Engineering | Lab + Quiz |
| 4 | Embeddings + Semantic Search | Lab + Quiz |
| 5 | RAG (Retrieval-Augmented Generation) | Lab + Quiz |
| 6 | Agents + Tool Calling | Lab + Quiz |
| 7 | Evaluation + Safety | Lab + Quiz |
| 8 | Deployment + LLMOps | Lab + Quiz |
| 9 | Capstone Project | Rubric |

Each level includes a **lesson** (markdown), **code lab** (Python in-browser via Pyodide + Monaco Editor), and **quiz** (MCQ with instant feedback).

**Scoring:** `total = quiz * 0.4 + lab * 0.6` — pass at 70%.

## Quick Start

```bash
git clone https://github.com/abhishekbedi1432/ai-engineer-roadmap.git
cd ai-engineer-roadmap
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Features

- **In-browser Python** — NumPy, Pandas, scikit-learn run via Pyodide (WebAssembly). No Python install needed.
- **Monaco Editor** — VS Code editing experience with syntax highlighting.
- **Progress tracking** — Scores persist in localStorage (guest) or Firestore (signed in).
- **Notes vault** — Per-level notes with auto-save.
- **8-week study plan** — Suggested pace for the full roadmap.

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router, TypeScript)
- [Pyodide](https://pyodide.org/) (Python in WebAssembly, loaded via Web Worker)
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) (`@monaco-editor/react`)
- [Firebase](https://firebase.google.com/) (Auth + Firestore, optional)
- [Tailwind CSS v4](https://tailwindcss.com/)

## Firebase Setup (Optional)

Firebase enables Google sign-in and cross-device progress sync. Without it, the portal works fully in guest mode (localStorage).

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Authentication** > Google sign-in
3. Create a **Firestore** database
4. Copy your config values into `.env.local`:

```bash
cp .env.example .env.local
# Fill in your Firebase config values
```

5. Deploy Firestore security rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

## Project Structure

```
src/
  app/                    # Next.js pages
    levels/[id]/          # Dynamic level page (lesson/lab/quiz tabs)
    dashboard/            # Progress overview
    schedule/             # 8-week study plan
  components/
    editor/               # CodeEditor, LabView, OutputPanel
    level/                # LessonView, QuizView, ScoreCard, LevelCard
    dashboard/            # ProgressOverview, ScheduleTimeline
    notes/                # NotesEditor
    ui/                   # Button, Card, Badge, Tabs, ProgressBar
  content/levels/         # Level data (lesson markdown, quiz, lab code)
  lib/
    firebase/             # Auth + Firestore helpers
    hooks/                # useProgress, useNotes
    utils/                # Scoring, cn (classnames)
  providers/              # AuthProvider
  types/                  # TypeScript interfaces
public/
  pyodide-worker.js       # Web Worker for in-browser Python
docs/
  ai_engineer_roadmap_codelab_colab.ipynb  # Source notebook
```

## Adding or Editing Content

Each level is a TypeScript file in `src/content/levels/level-{N}.ts` exporting a `LevelContent` object:

```typescript
{
  id: number,
  title: string,
  lesson: string,         // Markdown
  lab: {
    starterCode: string,  // Python with TODOs
    solutionCode: string, // Complete solution
    assertions: string,   // Python assert statements for grading
    requiredPackages: [],  // e.g. ["numpy", "pandas"]
  },
  quiz: [{ question, options, correctIndex, explanation }],
}
```

Edit the file, restart dev server, done.

## Deploy

```bash
npm run build   # Verify build
# Deploy to Vercel, Firebase Hosting, or any static host
```

## License

MIT
