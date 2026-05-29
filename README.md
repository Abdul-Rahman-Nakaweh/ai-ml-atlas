# AI/ML Atlas

A **guided learning atlas** for AI/ML—not a flat glossary. Organized in three layers:

1. **Learning Paths** — what to learn first and next  
2. **Knowledge Maps** — generations, pipeline, math  
3. **Concept Cards** — searchable techniques with depth tabs  

## Quick start

```bash
cd ai-ml-atlas
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Site structure

| Area | Pages |
|------|--------|
| **Start** | Home, Start Here, How to Use |
| **Learn** | Learning Paths, AI Generations, ML Pipeline |
| **Explore** | Technique Library, Glossary, Math Foundations |
| **Apply** | Evaluation, TinyML, LLMs, MLOps |
| **Decide** | Decision Guides, Common Mistakes, Comparisons |

## Where to edit content

| Content | File |
|---------|------|
| Learning paths | `src/data/learningPaths.ts` |
| Technique cards (full depth) | `src/data/techniques/enriched.ts` |
| Technique cards (base) | `src/data/techniques/*.ts` |
| Glossary | `src/data/glossary.ts` |
| Pipeline stages | `src/data/pipelineStages.ts` |
| Decision guides | `src/data/decisionGuides.ts` |
| Common mistakes | `src/data/commonMistakes.ts` |
| Comparison tables | `src/data/comparisons.ts` |
| Generations | `src/data/generations.ts` |
| Math foundations | `src/data/mathFoundations.ts` |

### Adding a technique

1. Add a raw entry in the appropriate `src/data/techniques/*.ts` file, **or** add a full card in `enriched.ts` (merged by `id`).
2. Use `defineTechnique()` in `enriched.ts` for the complete schema (quick, intuition, technical, math, learn before/after, etc.).
3. Raw entries are auto-normalized in `src/data/techniques/index.ts`.

### Technique schema (summary)

`id`, `name`, `generation`, `pipelineStage`, `purpose`, `mathFoundation`, `difficulty`, `conceptType`, `deploymentRelevance`, `quickExplanation`, `intuition`, `technicalExplanation`, `mathIdea`, `whenToUse`, `whenToAvoid`, `strengths`, `limitations`, `mainTradeoff`, `commonMistakes`, `relatedConcepts`, `learnBefore`, `learnAfter`, `deploymentNotes`

## Deploy to Vercel

Push to GitHub → Import on [vercel.com](https://vercel.com) → default Next.js settings. No env vars required.
