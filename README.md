# AI/ML Atlas

A **structured learning atlas** for machine learning: guided study first, reference lookup second.

## Navigation

| Page | Role |
|------|------|
| **Home** | Purpose, learning sequence, entry points |
| **Learn** | Single guided page with 9 chapters and sticky table of contents |
| **Library** | Searchable reference (algorithms, metrics, methods) |
| **Guides** | Model selection, evaluation, deployment, common errors, comparisons |
| **Glossary** | Quick terminology lookup |

Legacy URLs (e.g. `/techniques`, `/pipeline`) redirect to the new structure.

## Commands

```bash
npm install
npm run dev    # http://localhost:3000
npm run build
```

## Where to edit content

| Content | File |
|---------|------|
| **Learn chapters & formal concept panels** | `src/data/learnContent.ts` |
| **Library entries** | `src/data/techniques/*.ts`, `enriched.ts` |
| **Guides** | `src/data/decisionGuides.ts`, `commonMistakes.ts`, `comparisons.ts` |
| **Glossary** | `src/data/glossary.ts` |

### Learn page structure

Chapters are defined in `learnChapters` with subsections and blocks (`paragraph`, `list`, `concept`, `table`). Formal concepts use eight fields: Definition, Role in the Workflow, Purpose, Technical Basis, Practical Application, Limitations, Trade-offs, Related Concepts.

Table of contents: `src/types/learn.ts` → `learnToc`.

## Deploy

Push to GitHub → import on Vercel. No environment variables required.
