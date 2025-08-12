import { DATE_FORMAT } from '@/app/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dayjs } from 'dayjs';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type StaticConfig = {
  isCompleat: number,
  total?: number
  value?: number
  elapsed?: number
  duration?: number
}

export interface IHabitTask {
  habitId: string
  habitConfig: {
    name: string
    day_of_create: string
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
  habitStatic: Record<string, StaticConfig> | null
}

interface IStore {
  habitTask: Record<string, IHabitTask>
  startDateUser: string | null
  _hasHydrated: boolean
  setHasHydrated: (state: boolean) => void
  setStartDateUser: (date: Dayjs) => void
  setHabitTask: (habitId: string, habitConfig: Omit<IHabitTask, 'habitId'>) => void
  setIsCompleat: (habitId: string, date: string, habitStatic: StaticConfig) => void
  getIsCompleat: (habitId: string) => Record<string, StaticConfig> | null
  getHabitTask: (habitId: string) => IHabitTask | null
  updateHabitTask: (habitId: string, habitConfig: Omit<IHabitTask, 'habitId'>) => void
  removeHabitTask: (habitId: string) => void
}

const useStore = create<IStore>()(
	persist(
		(set, get) => ({
			habitTask: {},
			startDateUser: null,
			_hasHydrated: false,
			setHasHydrated: (state) => set({ _hasHydrated: state }),
			setStartDateUser: (date) => set({ startDateUser: date.format(DATE_FORMAT) }),
			setHabitTask: (habitId, habitConfig) => {
				set((state) => ({
					habitTask: { 
						...state.habitTask, 
						[habitId]: { 
						...habitConfig, 
						habitId 
						} 
					}
				}))
			},
			setIsCompleat: (habitId, date, habitStatic) => {
				set((state) => {
					const habit = state.habitTask[habitId]
					if (!habit) return state
					return {
						habitTask: {
						...state.habitTask,
						[habitId]: {
							...habit,
							habitStatic: {
							...(habit.habitStatic || {}),
							[date]: habitStatic
							}
						}
						}
					}
				})
			},
			getIsCompleat: (habitId) => {
				return get().habitTask[habitId]?.habitStatic || null
			},
			getHabitTask: (habitId) => {
				return get().habitTask[habitId] || null
			},
			updateHabitTask: (habitId, habitConfig) => {
				set((state) => ({
					habitTask: { 
						...state.habitTask, 
						[habitId]: { 
						...habitConfig, 
						habitId 
						} 
					}
				}))
			},
			removeHabitTask: (habitId) => {
				set((state) => {
					const newHabitTask = { ...state.habitTask }
					delete newHabitTask[habitId]
					return { habitTask: newHabitTask }
				})
			},
		}),
		{
			name: 'habit-storage-v2', // Измененное имя хранилища
			storage: createJSONStorage(() => ({
				getItem: async (name) => {
					const value = await AsyncStorage.getItem(name)
					return value
				},
				setItem: async (name, value) => {
					await AsyncStorage.setItem(name, value)
				},
				removeItem: async (name) => {
					await AsyncStorage.removeItem(name)
				},
			})),
			version: 2,
			partialize: (state) => ({
				habitTask: state.habitTask,
				startDateUser: state.startDateUser
			}),
			onRehydrateStorage: () => (state) => {
				state?.setHasHydrated(true)
			},
			migrate: (persistedState: any, version) => {
				if (persistedState && typeof persistedState.habitTask === 'number') {
					return { 
						habitTask: {}, 
						startDateUser: persistedState.startDateUser,
						_hasHydrated: false
					}
				}
				
				return {
					...persistedState,
					_hasHydrated: false
				}
			}
		}
	)
)
export default useStore