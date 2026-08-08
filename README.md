# ReactMart — Learn React + TypeScript by Building an E-Commerce App

ReactMart is a hands-on, project-based course for learning React and TypeScript. Instead of isolated exercises, you build one real app — an e-commerce store — one feature at a time, with each feature teaching a specific concept.

## What You'll Learn

- TypeScript in strict mode (typed props, discriminated unions, generics, advanced patterns)
- Client-side routing with React Router
- Forms and validation with React Hook Form + Zod
- Reusable logic with custom hooks
- State management — Zustand, Context API, and Redux Toolkit (and when to reach for each)
- Server state with TanStack Query (caching, mutations, infinite scroll)
- Performance optimization and code splitting
- Testing with Vitest and React Testing Library (unit and integration)

## Prerequisites

You should be comfortable with basic HTML, CSS, and JavaScript (variables, functions, arrays/objects). **No prior React experience is required.** If you've never worked with JSX or components before, skim [React's Quick Start](https://react.dev/learn) first — ReactMart moves fast from there.

You'll also need [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/installation) installed.

## Getting Started

```bash
git clone <this-repo-url>
cd react-crash-course
pnpm install
pnpm dev
```

## How This Repo Is Organized

- **`main`** holds the fully finished app, with every module merged in.
- **Every lesson lives on its own branch** (e.g. `v0.5-custom-hooks`, `v0.9-tanstack-query`). Branch names aren't perfectly uniform — one is even named `v0.7-state-mgmt-context-api.md` — that's a real repo quirk, not a typo in this doc.
- **`/specs`** holds one PRD-style spec per version — goal, background, constraints, and what's explicitly out of scope for that module.
- **[Roadmap.md](./Roadmap.md)** is the full syllabus: every version's milestones, concepts, branch name, spec link, and further reading.

## How to Learn From This Repo

Each module follows the same **try-then-check** loop:

1. Open [Roadmap.md](./Roadmap.md) and find the next version.
2. `git checkout` the **previous** version's branch — that's your starting point.
3. Read that version's spec in `/specs` to understand the goal and constraints.
4. Try implementing the feature yourself.
5. `git checkout` the target version's branch, then run `git diff <previous-branch> <this-branch>` to compare your attempt against the reference implementation.
6. Stuck on a concept? Use the "Reading" links under that version in Roadmap.md.

## Tech Stack

Vite, React, TypeScript, React Router, Zustand, Redux Toolkit, TanStack Query, React Hook Form, Zod, Tailwind CSS, Vitest, React Testing Library, MSW. See [Roadmap.md](./Roadmap.md#tech-stack) for the full breakdown by layer.

## Available Scripts

| Command             | Description                          |
| ------------------- | ------------------------------------- |
| `pnpm dev`           | Start the dev server with HMR         |
| `pnpm build`         | Type-check and build for production   |
| `pnpm preview`       | Preview the production build locally  |
| `pnpm lint`          | Run ESLint                            |
| `pnpm test`          | Run tests in watch mode               |
| `pnpm test:run`      | Run tests once                        |
| `pnpm test:coverage` | Run tests with coverage report        |

## Course Status

ReactMart is an ongoing, growing curriculum. v0.1 through v0.15 are complete — from project setup through integration testing — with more phases planned. See [Roadmap.md](./Roadmap.md) for the complete, up-to-date curriculum.
