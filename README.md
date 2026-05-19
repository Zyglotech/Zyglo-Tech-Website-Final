<<<<<<< HEAD
# Zyglo Tech Enterprise

A premium Next.js SaaS website repository for Zyglo Tech Enterprise, built with a modern App Router, Tailwind CSS, TypeScript, Prisma, Supabase, NextAuth, and cinematic UI design.

## 🚀 Project Overview

This repo contains the frontend and basic backend scaffolding for a B2B SaaS website focused on AI chatbots, ERP platforms, automation, and academy learning experiences. It is designed for enterprise-quality branding, polished interactions, and a premium visual presence.

## ✨ Key Features

- Next.js 14 App Router architecture
- Tailwind CSS with custom glassmorphism utilities
- TypeScript throughout
- Prisma schema and client setup
- Supabase initialization scaffold
- NextAuth authentication setup
- Animated premium homepage and reusable UI components
- Route structure for services, academy, case studies, pricing, and dashboard pages
- SEO metadata and sitemap generation

## 📦 Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Prisma
- Supabase
- NextAuth
- Framer Motion
- Lucide React icons

## 🧩 Project Structure

- `src/app/` — App Router pages and root layout
- `src/components/` — Shared UI components
- `src/lib/` — Helpers and library utilities
- `prisma/` — Prisma schema and migration configuration
- `public/` — Static assets and metadata files
- `.next/` — Next.js build output (generated)

## ⚙️ Setup & Development

### Prerequisites

- Node.js 20+ installed
- npm installed
- PostgreSQL or compatible database for Prisma if using backend features

### Install dependencies

```bash
npm install
```

### Start local development server

```bash
npm run dev
```

If port `3000` is already in use, Next.js will automatically fall back to `3001`.

### Build for production

```bash
npm run build
```

### Start production server locally

```bash
npm run start
```

## 🧠 Notes & Troubleshooting

- If you see a missing module or bundle error from `.next/server`, remove the build cache and restart:

```bash
rm -rf .next
npm run dev
```

- Make sure any client-only components that use `framer-motion` include `'use client'` at the top.
- If the site renders a `404` on a valid route, confirm the route file exists under `src/app/` with `page.tsx`.

## 📌 Available Routes

- `/`
- `/about`
- `/services`
- `/case-studies`
- `/academy`
- `/academy/courses`
- `/academy/bootcamps`
- `/academy/free-resources`
- `/pricing`
- `/contact`
- `/dashboard`
- `/demo`

## 📚 Current Status

- Homepage is fully redesigned with a cinematic premium interface.
- Core route scaffolding and page shells are present.
- Backend Prisma + authentication scaffolding exists, but integrations may still need completion.

## 📞 Contact

For development questions or updates, use the repository's issue tracker or contact the project owner in GitHub.
=======
# Zyglo-Tech-
Website for zyglo tech
>>>>>>> f04223c64a5961852a6e56cf907712e630d8b277
