import AsyncStorage from '@react-native-async-storage/async-storage'
import { Dayjs } from 'dayjs'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type staticConfig = {
	isCompleat: number,
	total?: number      // для reusable
    value?: number      // для reusable
    elapsed?: number    // для timer
    duration?: number   // для timer
}
export interface IHabitTask {
	habitId: string
	habitConfig: {
		name: string
		day_of_create: string,
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
  	habitStatic: Map<string, staticConfig> | null
}

interface IStore {
	habitTask: Map<string, IHabitTask>
	startDateUser: Dayjs | null
	setStartDateUser: (date: Dayjs) => void
	setHabitTask: (habitId: string, habitConfig: IHabitTask) => void
	setIsCompleat: (habitId: string, date: string, habitStatic: staticConfig) => void,
	getIsCompleat: (habitId: string) => IHabitTask['habitStatic'] | null
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
			setIsCompleat: (habitId: string, date: string, habitStatic: staticConfig) => 
				set((state) => {
					const oldHabitTask = state.habitTask.get(habitId)
					if (!oldHabitTask) return { habitTask: state.habitTask }

					const newHabitStatic = new Map(oldHabitTask.habitStatic || [])
					newHabitStatic.set(date, habitStatic)

					const newHabitTask: IHabitTask = {
						...oldHabitTask,
						habitStatic: newHabitStatic,
					}

					const newHabitTaskMap = new Map(state.habitTask)
					newHabitTaskMap.set(habitId, newHabitTask)

					return { habitTask: newHabitTaskMap }
				}
			),
			getIsCompleat: (habitId: string) => {
				const habitStatic = get().habitTask.get(habitId)?.habitStatic
				return habitStatic ?? null
			},
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
			habitTask: Array.from(state.habitTask.entries()).map(([key, value]) => [
				key,
				{
					...value,
					habitStatic: value.habitStatic
						? Array.from(value.habitStatic.entries())
						: null,
				},
			]),
		}),
		merge: (persistedState, currentState) => {
			const state = persistedState as { habitTask: [string, any][] } | undefined
			const habitTaskMap = new Map<string, IHabitTask>()

			state?.habitTask?.forEach(([key, value]) => {
				const habitStaticMap = value.habitStatic
					? new Map(value.habitStatic)
					: null
				habitTaskMap.set(key, {
					...value,
					habitStatic: habitStaticMap,
				})
			})

			return {
				...currentState,
				...state,
				habitTask: habitTaskMap,
			}
		}
		}
	)
)

export default useStore