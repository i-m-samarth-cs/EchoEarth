# EchoEarth

**The Temporal Mirror** — a personalized climate lifestyle studio that maps your daily habits to their carbon shadow, simulates alternate 2050 futures, and surfaces actionable micro-missions.

---
<img width="1877" height="1027" alt="image" src="https://github.com/user-attachments/assets/665d032f-9e47-46e7-a0b4-17a5d4db98e3" />

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Production](#production)
- [Project Structure](#project-structure)
- [User Journey](#user-journey)
- [Scripts](#scripts)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

---

## About

EchoEarth turns everyday lifestyle choices — commute, diet, and home energy — into an interactive narrative. Users progress through gated phases, reveal hidden environmental impact via a scratch-pad interface, explore parallel climate futures, and commit to verified micro-missions that reduce their footprint.

---

## Features

| Module | Description |
|--------|-------------|
| **Hero Timeline** | Live simulation dashboard with habit table, phase status, and sustainability progress bars |
| **Interactive Day Builder** | Three-phase questionnaire (commute → diet → energy) with per-phase review tables |
| **Carbon Shadow (Scratch Pad)** | Locked until all phases complete; scratch-to-reveal supply chain and emissions data |
| **Parallel Futures Engine** | Three extrapolated 2050 timelines based on habit scores |
| **Action Ecosystem** | Commit-able micro-missions with live savings output and confirmation feedback |
| **Community Grid** | Local persona cards showcasing real-world impact stories |
| **AI Companion Dock** | Glass-morphism navigation dock for quick section access |

---

## Tech Stack

- **[Next.js 16](https://nextjs.org/)** — App Router, Turbopack
- **[React 19](https://react.dev/)** — UI
- **[TypeScript](https://www.typescriptlang.org/)** — Type safety
- **[Tailwind CSS 4](https://tailwindcss.com/)** — Styling
- **[Framer Motion](https://www.framer.com/motion/)** — Animations
- **[Lucide React](https://lucide.dev/)** — Icons

---

## Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm** 9+ (or yarn / pnpm)

### Installation

```bash
git clone https://github.com/<your-username>/EchoEarth.git
cd EchoEarth
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production

```bash
npm run build
npm start
```

---

## Project Structure
<img width="1367" height="936" alt="image" src="https://github.com/user-attachments/assets/69909f61-b539-445d-a651-3506e30d4693" />


```
EchoEarth/
├── public/                  # Static assets
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout, fonts, global dock
│   │   ├── page.tsx         # Main page & section orchestration
│   │   └── globals.css      # Global styles & Tailwind
│   ├── components/
│   │   ├── sections/        # Page sections (hero, builder, shadow, etc.)
│   │   └── ui/              # Reusable UI (ink-reveal, glass dock, scroll)
│   └── lib/
│       ├── behavioral-engine.ts  # Impact scoring & phase logic
│       ├── seed-data.ts          # Day-builder options & personas
│       └── utils.ts              # Shared utilities
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## User Journey

```
Hero Timeline
      ↓
Phase 01 — Commute  →  Review table  →  Continue
      ↓
Phase 02 — Diet     →  Review table  →  Continue
      ↓
Phase 03 — Energy   →  Full summary  →  Unlock Scratch Pad
      ↓
Carbon Shadow (scratch to reveal metrics)
      ↓
Parallel Futures (2050 simulations)
      ↓
Action Ecosystem (commit micro-missions)
      ↓
Community Grid
```

<img width="1876" height="1022" alt="image" src="https://github.com/user-attachments/assets/9fedc555-055a-47b4-8e77-d4dae352d2f8" />

**Gating rules**

- Scratch pad is disabled until all three habit phases are complete.
- Parallel Futures and Community Grid render only after phases are complete.
- Micro-missions show a locked state until phases are complete; **Commit** activates missions and displays savings output.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Create optimized production build |
| `npm start` | Serve production build |
| `npm run lint` | Run ESLint |

---
<img width="1402" height="960" alt="image" src="https://github.com/user-attachments/assets/cf243446-ff0f-47af-89b0-64b1d2f58d26" />

## Configuration

### Turbopack root

If you see a workspace-root warning due to multiple `package-lock.json` files on your machine, the project sets an explicit root in `next.config.ts`:

```ts
turbopack: {
  root: process.cwd(),
}
```

### Environment variables

No environment variables are required for local development. Create a `.env.local` file only if you add external API integrations later.

---
<img width="1402" height="960" alt="image" src="https://github.com/user-attachments/assets/2c0a49ac-4c0c-4223-8419-77628db42b47" />

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

Please run `npm run lint` and `npm run build` before submitting.

---

## License

This project is private. All rights reserved.
