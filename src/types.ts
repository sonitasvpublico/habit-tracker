export interface Habit {
  id: string
  name: string
  createdAt: Date
  /** Dates when habit was completed, format YYYY-MM-DD for easy storage and streak calc */
  completedDates: string[]
}