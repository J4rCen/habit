import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface IHabitTask {
  habitId: number
  habitConfig: {
    name: string
    type_of_habit: 'reusable' | 'onetime'
    interval_execution: 'every_day' | 'certain_days' | 'gap'
    days_of_week?: Array<string>
    gap_interval?: {
      days_in_row: number
      skip_days: number
    }
    times_of_day: 'morning' | 'day' | 'evening'
    type_of_task: 'single_mark' | 'reusable_mark' | 'timer'
    timer_time?: string
    quantity?: number
    reminder: boolean
    reminder_time?: string
  }
  habitStatic: {}
}

interface IStore {
  habitTask: Map<number, IHabitTask>
  setHabitTask: (habitId: number, habitConfig: IHabitTask) => void
  getHabitTask: (habitId: number) => IHabitTask | null
  updateHabitTask: (habitId: number, habitConfig: IHabitTask) => void
  removeHabitTask: (habitId: number) => void
}

const useStore = create<IStore>()(
  persist(
    (set, get) => ({
      habitTask: new Map(),
      setHabitTask: (habitId: number, habitConfig: IHabitTask) =>
        set(() => {
          const map = new Map(get().habitTask)
          map.set(habitId, habitConfig)
          return { habitTask: map }
        }),
      getHabitTask: (habitId: number) => {
        const habitTask = get().habitTask.get(habitId)
        return habitTask ?? null
      },
      updateHabitTask: (habitId: number, habitConfig: IHabitTask) =>
        set(() => {
          const map = new Map(get().habitTask)
          if (map.has(habitId)) {
            map.set(habitId, habitConfig)
          }
          return { habitTask: map }
        }),
      removeHabitTask: (habitId: number) =>
        set(() => {
          const map = new Map(get().habitTask)
          map.delete(habitId)
          return { habitTask: map }
        }),
    }),
    {
      name: 'habit-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        ...state,
        habitTask: Array.from(state.habitTask.entries()),
      }),
      merge: (persistedState, currentState) => {
        const state = persistedState as { habitTask: [number, IHabitTask][] } | undefined
        return {
          ...currentState,
          ...state,
          habitTask: new Map(state?.habitTask ?? []),
        }
      },
    }
  )
)

export default useStore
