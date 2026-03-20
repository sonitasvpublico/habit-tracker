function dateToKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/** Today's date as YYYY-MM-DD */
export function todayKey(): string {
  return dateToKey(new Date())
}

/** Yesterday's date as YYYY-MM-DD */
export function yesterdayKey(): string {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return dateToKey(d)
}

/** Last 7 days (today + 6 before) as YYYY-MM-DD, most recent first */
export function getLast7DaysKeys(): string[] {
  const out: string[] = []
  const d = new Date()
  for (let i = 0; i < 7; i++) {
    out.push(dateToKey(d))
    d.setDate(d.getDate() - 1)
  }
  return out
}

/** Number of consecutive days including today (0 if today not completed) */
export function getStreak(completedDates: string[]): number {
  const set = new Set(completedDates)
  const key = todayKey()
  if (!set.has(key)) return 0
  let count = 1
  const d = new Date()
  for (let i = 0; i < 365; i++) {
    d.setDate(d.getDate() - 1)
    if (!set.has(dateToKey(d))) break
    count++
  }
  return count
}

/** Count how many of the last 7 days are in completedDates */
export function getWeeklyCount(completedDates: string[]): number {
  const set = new Set(completedDates)
  return getLast7DaysKeys().filter((k) => set.has(k)).length
}

/** Current week Mon–Sun as date keys (ISO week) */
export function getCurrentWeekDateKeys(): string[] {
  const now = new Date()
  const day = now.getDay()
  const mondayOffset = day === 0 ? -6 : 1 - day
  const monday = new Date(now)
  monday.setDate(now.getDate() + mondayOffset)
  const out: string[] = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    out.push(dateToKey(d))
  }
  return out
}

/** Short weekday label for a date key (e.g. "Mon", "Lun") */
export function getDayShortLabel(dateKey: string, locale: string): string {
  const [y, m, d] = dateKey.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  const loc = locale === 'es' ? 'es-ES' : locale === 'fi' ? 'fi-FI' : 'en'
  return date.toLocaleDateString(loc, { weekday: 'short' })
}
