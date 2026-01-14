# Project Setup — Sublime Expense Tracker 🔧

This file explains how to set up and run the project locally, plus common commands and troubleshooting tips.

## Requirements

- Node.js >= 16
- npm or yarn
- (Optional) VS Code recommended

## Installation

1. Clone the repository:

```bash
git clone <repo-url>
cd sublime_expense_tracker
```

2. Install dependencies:

```bash
npm install
# or
# yarn
```

## Development

Start the dev server:

```bash
npm run dev
# or
# npm start
```

Open http://localhost:5173 (or the port printed in the terminal).

## Build

To create a production build:

```bash
npm run build
```

## Linting & Type Checking

Run ESLint and TypeScript checks:

```bash
npm run lint
npm run type-check
```

## Tests

If tests are present:

```bash
npm test
```

## Troubleshooting

- If ports are in use, change Vite port in `vite.config.ts`.
- If Tailwind (or other optional plugins) is missing, ensure it is installed as a dev dependency.

---

If you'd like, I can add a more detailed README with project structure, conventions, or contributions guidelines. ✅
