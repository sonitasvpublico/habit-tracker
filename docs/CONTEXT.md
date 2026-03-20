# Context for Habit Tracker Project

## 🎯 What This App Is

**Rastreador de hábitos:** la gente agrega hábitos, **cada día marca si los hizo** ("Hecho hoy"), y ve una **racha** (días seguidos) para sentirlo útil. Una pantalla, sin cuenta, guardado en el navegador (localStorage). Sencillo y meaningful.

**Doc de propósito (no perder el punto):** ver **PURPOSE.md** — ahí está el "por qué", el alcance mínimo y el plan rápido.

**Hoy:** Add habits, list, delete, idiomas EN/ES/FI. Falta: persistencia, "Hecho hoy", racha, y un toque de UI.

## 👤 About the Developer

- **Name:** Sonia
- **Background:** Product Designer with 5 years UX/UI and manual testing experience
- **Current Goal:** Learn TypeScript deeply while building practical projects
- **Previous Project:** OmaVoltio (electricity price tracking app) - published to App Store & Google Play
- **Tech Experience:** React, TypeScript basics, Firebase, API integration, mobile deployment

## 🎓 Learning Approach

**Strategy:** Learn TypeScript by building, with explanations at each step

- Explain concepts as we use them
- Show practical applications
- Build incrementally
- Focus on understanding, not just copying

## 📝 Project Goals

1. **Learn TypeScript deeply** - understand types, interfaces, generics, etc.
2. **Build something useful** - a habit tracker you can actually use
3. **Practice best practices** - clean code, proper typing
4. **Portfolio piece** - something to show your skills

## 🚀 Current Status

- ✅ Project created with Vite + React + TypeScript
- ✅ Types: `Habit` interface (id, name, createdAt, completedDates)
- ✅ Add habits (AddHabitForm), list and delete (HabitList), state in App
- ✅ i18n: English (default), Spanish (ES), Finnish (FI) with language switcher in header
- ⏳ Next: persistence (localStorage), mark complete per day, streaks, stats, UI polish

## 💬 Communication Style

- User prefers explanations in Spanish
- Wants to understand WHY, not just HOW
- Likes step-by-step approach
- Appreciates encouragement and reassurance

## 🔗 Related Projects

- **OmaVoltio:** `/Users/soniazavaletatoukkari/Desktop/electricity-fin`
  - Full-stack mobile app
  - React + TypeScript + Firebase + Capacitor
  - Published to both app stores

## 📚 TypeScript Learning Path

We'll cover:
1. Basic types and interfaces
2. Typed functions and components
3. State management with types
4. Advanced patterns (generics, utility types)

Each concept explained with practical examples from the habit tracker.

---

**This file helps maintain context when switching between projects.**


## 📋 Guía de pasos (qué hice / qué sigue)

### Completados
1. **Interfaz `Habit`** – `src/types.ts` (id, name, createdAt, completedDates).
2. **Formulario** – `AddHabitForm.tsx` (agregar hábitos, props tipadas).
3. **Lista** – `HabitList.tsx` (mostrar y eliminar hábitos).
4. **App** – `App.tsx` con estado `habits`, handlers, integración de componentes.
5. **Idiomas** – `translations.ts` + `LanguageContext.tsx`, selector EN / ES / FI en el header.

### Próximos pasos
6. **Persistencia** – Guardar/cargar hábitos en localStorage.
7. **Marcar completado** – Checkbox por día y guardar en `completedDates`.
8. **Rachas y estadísticas** – Cálculo de rachas y porcentajes.
9. **Embellecer** – Mejorar layout, colores, espaciado, maybe cards o secciones.
