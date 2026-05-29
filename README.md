# AI/ML Atlas

A practical knowledge map for understanding, comparing, and deploying machine learning techniques.

Built with **Next.js App Router**, **TypeScript**, and **Tailwind CSS**. All content lives in local static data files—no database or authentication required for this MVP.

## Quick start

Install [Node.js](https://nodejs.org/) (LTS recommended), then:

```bash
cd ai-ml-atlas
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm start
```

## Folder structure

```
ai-ml-atlas/
├── src/
│   ├── app/                 # Pages (App Router)
│   │   ├── page.tsx         # Home
│   │   ├── generations/
│   │   ├── pipeline/
│   │   ├── techniques/
│   │   ├── math/
│   │   ├── glossary/
│   │   ├── tinyml/
│   │   ├── llm/
│   │   ├── evaluation/
│   │   └── mlops/
│   ├── components/          # UI components (Navbar, cards, etc.)
│   ├── data/                # Static content
│   │   ├── techniques/      # Technique library (split by category)
│   │   ├── generations.ts
│   │   ├── pipelineStages.ts
│   │   ├── mathFoundations.ts
│   │   └── glossary.ts
│   ├── types/               # TypeScript interfaces
│   └── lib/                 # Utilities (cn, normalizeArray)
├── public/
├── package.json
└── tailwind.config.ts
```

## Adding a new technique

1. Open the appropriate file under `src/data/techniques/` (e.g. `classical-ml.ts`, `modern-ai.ts`) or create a new category file.
2. Add an object matching the `Technique` interface in `src/types/index.ts`.
3. Export the array from that file and include it in `src/data/techniques/index.ts`.

Example:

```ts
{
  id: "my-technique",
  name: "My Technique",
  shortDescription: "One-line summary.",
  generation: "Gen 1",
  pipelineStage: "Model Selection",
  purpose: "Classification",
  mathFoundation: "Probability",
  strengths: ["..."],
  limitations: ["..."],
  whenToUse: "...",
  whenNotToUse: "...",
  tradeOffs: "...",
  relatedConcepts: ["Related A", "Related B"],
  deploymentNotes: "Optional embedded notes",
}
```

The Technique Library page picks up new entries automatically.

## Deploy to Vercel

1. Push the project to GitHub (or GitLab/Bitbucket).
2. Sign in at [vercel.com](https://vercel.com) and **Import Project**.
3. Set the root directory to `ai-ml-atlas` if the repo contains other folders.
4. Vercel detects Next.js; default build command `npm run build`, output handled automatically.
5. Deploy. Future pushes to the main branch trigger redeploys.

No environment variables are required for this MVP.

## License

MIT (add a LICENSE file if you publish publicly).
