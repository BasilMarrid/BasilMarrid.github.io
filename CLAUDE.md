# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server on port 8080
npm run build        # Production build
npm run lint         # Run ESLint
npm run test         # Run tests once
npm run test:watch   # Run tests in watch mode
```

## Architecture

This is a Hebrew RTL website for EY CPA (tax refund services) built with Vite, React, TypeScript, and shadcn/ui.

### Tech Stack
- **Build**: Vite with SWC for React
- **Styling**: Tailwind CSS with shadcn/ui components
- **State**: React Query for async state
- **Routing**: React Router DOM
- **Forms**: Formspree integration for contact forms

### Project Structure
- `src/pages/` - Route pages (Index, AboutHe, NotFound)
- `src/components/ui/` - shadcn/ui primitives (do not edit directly)
- `src/components/` - Custom components
- `src/hooks/` - Custom React hooks
- `src/lib/utils.ts` - `cn()` utility for Tailwind class merging

### Design System
Colors and utilities defined in `src/index.css`:
- **Primary**: Navy (`--navy`, `--primary`)
- **Accent**: Gold (`--gold`, `--accent`)
- **Font**: Heebo (Hebrew-friendly)
- **Utilities**: `.text-gradient-gold`, `.bg-gradient-hero`, `.shadow-elegant`

### Path Alias
`@/` maps to `src/` (configured in vite.config.ts)

### Deployment
Built to `docs/` folder for GitHub Pages. Uses relative base path (`./`).
