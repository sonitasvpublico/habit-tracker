# Habit Tracker

A **habit tracker** that stays useful and simple: add habits, **mark them "Done today"**, see a **streak** (consecutive days). One screen, no account, data in the browser. Built with React + TypeScript + Vite.

**Purpose and scope:** see **docs/PURPOSE.md** (why the app exists, minimal scope, fast dev plan).

## What it does (target)

- **Add habits** – Name and add.
- **Mark "Done today"** – Per habit, mark if you did it today; dates stored in `completedDates`.
- **Streak** – Show consecutive days (e.g. "3 days") next to each habit.
- **Persist** – localStorage so nothing is lost on refresh.
- **Languages** – EN / ES / FI in the header.

*Currently: add, list, delete, languages. Persistence + "Done today" + streak in progress.*

## Run locally

```bash
npm install
npm run dev
```

Then open **http://localhost:5173**.

## Tech stack

- **React 19** + **TypeScript**
- **Vite 7**
- **CSS** (no framework); i18n via custom `translations.ts` + `LanguageContext`

## Project structure (main files)

- `src/App.tsx` – Main app, habits state, language switcher
- `src/AddHabitForm.tsx` – Form to add a habit
- `src/HabitList.tsx` – List of habits with delete
- `src/types.ts` – `Habit` interface (id, name, createdAt, completedDates)
- `src/translations.ts` – EN / ES / FI strings
- `src/LanguageContext.tsx` – Language state and `t()` for translations

## Planned features

- **Persist habits** in localStorage
- **Mark habit complete** per day (use `completedDates`)
- **Streaks** and **statistics**
- **UI polish** – layout, cards, spacing, theme

## Documentation (`docs/`)

- **docs/PURPOSE.md** – Why the app exists, minimal scope, fast dev plan
- **docs/CONTEXT.md** – Project context, status, step guide
- **docs/PROJECT_PLAN.md** – Learning goals, features, next steps
