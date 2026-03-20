import { useState, useRef, useEffect, type FormEvent } from 'react'
import type { Habit } from './types'
import { useLanguage } from './LanguageContext'

interface AddHabitFormProps {
  onAdd: (habit: Habit) => void
  inputRef?: React.RefObject<HTMLInputElement | null>
}

function AddHabitForm({ onAdd, inputRef: inputRefProp }: AddHabitFormProps) {
  const [name, setName] = useState('')
  const internalRef = useRef<HTMLInputElement>(null)
  const inputRef = inputRefProp ?? internalRef
  const { t } = useLanguage()

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!name.trim()) return

    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name: name.trim(),
      createdAt: new Date(),
      completedDates: [],
    }
    onAdd(newHabit)
    setName('')
  }

  useEffect(() => {
    if (name === '' && inputRef.current) {
      inputRef.current.focus()
    }
  }, [name])

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={t('habitPlaceholder')}
        aria-label={t('habitPlaceholder')}
      />
      <button type="submit">{t('addButton')}</button>
    </form>
  )
}

export default AddHabitForm