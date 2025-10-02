# Tic Tac Toe — Ocean Professional

A minimalist browser-based Tic Tac Toe game built with Next.js, TypeScript, and Tailwind CSS. No backend, just local state.

## Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open http://localhost:3000 to play.

## Features

- Clean, modern design using the Ocean Professional theme:
  - Primary: #2563EB (blue)
  - Accent: #F59E0B (amber)
  - Error: #EF4444
  - Background: #f9fafb
  - Text: #111827
- Smooth transitions, subtle gradients, rounded corners, and soft shadows
- Local state only: no backend required
- Score tracking for X, O, and draws
- Soft reset (board only) and hard reset (scores + board)
- Accessible labels with ARIA roles

## Structure

- src/app/page.tsx — Main game UI and logic
- src/app/layout.tsx — Global layout and metadata
- src/app/globals.css — Theme tokens and light global styles

## Build

```bash
npm run build
npm start
```

The app is configured with `output: "export"` for static export via Next.js.
