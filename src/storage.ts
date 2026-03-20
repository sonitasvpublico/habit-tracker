import type { Habit } from './types'

const STORAGE_KEY = 'habit-tracker-habits'

type HabitSerialized = {
  id: string
  name: string
  createdAt: string
  completedDates: string[]
}

function serialize(habits: Habit[]): HabitSerialized[] {
  return habits.map((h) => ({
    id: h.id,
    name: h.name,
    createdAt: h.createdAt.toISOString(),
    completedDates: h.completedDates,
  }))
}

function deserialize(raw: HabitSerialized[]): Habit[] {
  return raw.map((h) => ({
    id: h.id,
    name: h.name,
    createdAt: new Date(h.createdAt),
    completedDates: h.completedDates ?? [],
  }))
}

export function loadHabits(): Habit[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as HabitSerialized[]
    return Array.isArray(parsed) ? deserialize(parsed) : []
  } catch {
    return []
  }
}

export function saveHabits(habits: Habit[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(serialize(habits)))
}
