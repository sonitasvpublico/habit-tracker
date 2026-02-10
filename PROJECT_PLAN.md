# Habit Tracker - Project Plan & Learning Goals

## 🎯 Project Overview
**Name:** Habit Tracker  
**Purpose:** Simple habit tracking application to learn TypeScript deeply  
**Created:** January 2026  
**Status:** Starting development

---

## 📚 Learning Objectives

### TypeScript Concepts We'll Cover:

#### **Level 1: Basics**
- ✅ Basic types (`string`, `number`, `boolean`)
- ✅ Interfaces and custom types
- ✅ Typed functions
- ✅ Typed React props

#### **Level 2: Intermediate**
- ⏳ Optional types (`?`)
- ⏳ Union types (`|`)
- ⏳ Typed arrays and objects
- ⏳ Basic generics (`<T>`)

#### **Level 3: Advanced**
- ⏳ Utility types (`Partial`, `Pick`, `Omit`)
- ⏳ Conditional types
- ⏳ Complex type patterns

---

## 🏗️ Project Structure

### Features to Build:
1. **Add/Remove Habits**
   - Form to add new habits
   - List of habits with delete option
   - TypeScript: Interfaces, form handling

2. **Mark Habits Complete**
   - Checkbox to mark habits as done
   - Track completion by date
   - TypeScript: State management, date handling

3. **Streak Tracking**
   - Calculate consecutive days
   - Display streak counter
   - TypeScript: Date calculations, logic

4. **Statistics**
   - Completion percentage
   - Weekly/monthly stats
   - TypeScript: Data aggregation, calculations

5. **Persistence**
   - Save to localStorage
   - Load on app start
   - TypeScript: Data serialization

---

## 🛠️ Tech Stack

- **Frontend:** React + TypeScript
- **Styling:** CSS (can add Tailwind later if needed)
- **Build Tool:** Vite
- **Storage:** localStorage (for now)

---

## 📝 Development Notes

### Approach:
- **Learn by doing:** We'll explain TypeScript concepts as we use them
- **Step by step:** Build features incrementally
- **Practical examples:** Each concept applied in real code

### Current Status:
- ✅ Project created with Vite + React + TypeScript
- ⏳ Starting with basic types and interfaces
- ⏳ Building first feature: Add habits

---

## 🎓 TypeScript Learning Path

### Step 1: Basic Types & Interfaces
**What we'll learn:**
- How to define types for our data
- Creating interfaces for habits
- Type safety in React components

**Code example:**
```typescript
interface Habit {
  id: string;
  name: string;
  completed: boolean;
  createdAt: Date;
}
```

### Step 2: Typed Functions & Components
**What we'll learn:**
- Function parameters and return types
- Typed React components
- Props interfaces

### Step 3: State Management with Types
**What we'll learn:**
- Typed useState hooks
- Type-safe state updates
- Array operations with types

### Step 4: Advanced Patterns
**What we'll learn:**
- Optional properties
- Union types
- Utility types
- Generic functions

---

## 📋 Next Steps

1. Define Habit interface
2. Create AddHabitForm component
3. Create HabitList component
4. Add localStorage persistence
5. Add streak calculation
6. Add statistics

---

## 💡 Notes from Previous Session

- User wants to learn TypeScript deeply while building
- Project should be simple but useful
- Focus on understanding concepts, not just copying code
- Explain each TypeScript feature as we use it

---

**Last Updated:** January 2026
