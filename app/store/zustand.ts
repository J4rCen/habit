import AsyncStorage from '@react-native-async-storage/async-storage'
import { Dayjs } from 'dayjs'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface IHabitTask {
  habitId: string
  habitConfig: {
	name: string
	type_of_habit: 'reusable' | 'onetime'
	interval_execution: 'every_day' | 'certain_days' | 'gap' | null
	days_of_week?: Array<string> | null
	gap_interval?: {
	  days_in_row: number
	  skip_days: number
	} | null
	times_of_day: 'all' | 'morning' | 'day' | 'evening'
	type_of_task: 'single_mark' | 'reusable_mark' | 'timer'
	timer_time?: string | null
	quantity?: number | null
	reminder: boolean
	reminder_time?: string | null
  }
  habitStatic?: {
	isCompleat: number | undefined,
	date: Date
  }
}

interface IStore {
  habitTask: Map<string, IHabitTask>
  startDateUser: Dayjs | null
  setStartDateUser: (date: Dayjs) => void
  setHabitTask: (habitId: string, habitConfig: IHabitTask) => void
  setIsCompleat: (habitId: string, habitStatic: IHabitTask['habitStatic']) => void,
  getHabitTask: (habitId: string) => IHabitTask | null
  updateHabitTask: (habitId: string, habitConfig: IHabitTask) => void
  removeHabitTask: (habitId: string) => void
}

const useStore = create<IStore>()(
  persist(
	(set, get) => ({
	  habitTask: new Map(),
	  startDateUser: null,
	  setStartDateUser: (date) => set(() => {
			return {startDateUser: date}
	  }),
	  setHabitTask: (habitId: string, habitConfig: IHabitTask) =>
		set(() => {
			const map = new Map(get().habitTask)
			map.set(habitId, habitConfig)
			return { habitTask: map }
		}
	  ),
	  setIsCompleat: (habitId: string, habitStatic: IHabitTask['habitStatic']) => 
		set(() => {
			return {}
		}
	  ),
	  getHabitTask: (habitId: string) => {
		const habitTask = get().habitTask.get(habitId)
		return habitTask ?? null
	  },
	  updateHabitTask: (habitId: string, habitConfig: IHabitTask) =>
		set(() => {
		  const map = new Map(get().habitTask)
		  if (map.has(habitId)) {
			map.set(habitId, habitConfig)
		  }
		  return { habitTask: map }
		}),
	  removeHabitTask: (habitId: string) =>
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
		const state = persistedState as { habitTask: [string, IHabitTask][] } | undefined
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
