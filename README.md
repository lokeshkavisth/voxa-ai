# Voxa.ai

AI-powered career coaching platform with industry insights, skill assessments, resume builder, and cover letter generation.

## Tech Stack

- Next.js 15 (App Router)
- React 19, Tailwind CSS, shadcn/ui
- Clerk (authentication)
- Prisma + Neon PostgreSQL
- Google Gemini (AI)
- Inngest (background jobs)

## Setup

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp env.example .env
```

3. Configure the following in `.env`:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key |
| `CLERK_SECRET_KEY` | Clerk secret key |
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `GEMINI_API_KEY` | Google Gemini API key |
| `INNGEST_EVENT_KEY` | Inngest event key (optional for dev) |
| `INNGEST_SIGNING_KEY` | Inngest signing key |

4. Run database migrations:

```bash
npx prisma migrate dev
```

5. Start the development server:

```bash
npm run dev
```

6. (Optional) Start Inngest dev server for background jobs:

```bash
npx inngest-cli@latest dev
```

## Scripts

- `npm run dev` — Start dev server with Turbopack
- `npm run build` — Generate Prisma client and build for production
- `npm run start` — Start production server
- `npm run lint` — Run ESLint

## Features

- **Onboarding** — Set industry, skills, and experience
- **Industry Insights** — AI-generated salary, trends, and skill data
- **Assessments** — Timed MCQ quizzes with performance tracking
- **Resume Builder** — Form-based builder with AI feedback and PDF export
- **Cover Letter Generator** — AI-generated cover letters saved to your account
