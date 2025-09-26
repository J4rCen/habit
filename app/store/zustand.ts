import { DATE_FORMAT } from '@/app/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs, { Dayjs } from 'dayjs';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type StaticConfig = {
	isCompleat: number,
	total?: number
	value?: number
	elapsed?: number
	duration?: number
}

export type TDayInterval = {
	morningTime: string,
	dayTime: string,
	eveningTime: string
}

export interface IHabitTask {
	habitId: string
	habitConfig: {
		name: string
		day_of_create: string
		type_of_habit: 'reusable' | 'onetime'
		oneTimeDay: string | null,
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
		notificationsId?: string | null,
	}
	habitStatic: Record<string, StaticConfig> | null
}

interface IStore {
	habitTask: Record<string, IHabitTask>
	startDateUser: string | null
	dayInterval: TDayInterval,
	email: string | null,
	premium: boolean,
	_hasHydrated: boolean
	setHasHydrated: (state: boolean) => void
	initializeApp: () => void
	initializeStartDateUser: (data: string) => void
	initializeHabits: (data: any) => void
	setStartDateUser: (date: Dayjs) => void
	setHabitTask: (habitId: string, habitConfig: Omit<IHabitTask, 'habitId'>) => void
	setIsCompleat: (habitId: string, date: string, habitStatic: StaticConfig) => void
	getIsCompleat: (habitId: string) => Record<string, StaticConfig> | null
	getHabitTask: (habitId: string) => IHabitTask | null
	updateHabitTask: (habitId: string, habitConfig: Omit<IHabitTask, 'habitId'>) => void
	removeHabitTask: (habitId: string) => void,
	setDayInterval: (data: TDayInterval) => void
}

const useStore = create<IStore>()(
	persist(
		(set, get) => ({
			habitTask: {},
			startDateUser: null,
			dayInterval: {
				morningTime: '08:00',
				dayTime: '12:00',
				eveningTime: '18:00',
			},
			email: null,
			premium: false,
			_hasHydrated: false,
			setHasHydrated: (state) => set({ _hasHydrated: state }),
			initializeApp: async () => {
				const alreadyLaunched = await AsyncStorage.getItem('_isFirstLaunch')

				if (!alreadyLaunched) {
					const startDateUser = dayjs().format(DATE_FORMAT)
					set({ startDateUser })
					await AsyncStorage.setItem('_isFirstLaunch', 'true')
				}
			},
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
			initializeStartDateUser: (date: string) => set(() => {
				return { startDateUser: date }
			}
			),
			initializeHabits: (data) => {
				set((state) => ({
					habitTask: {
						...state.habitTask,
						...data,
					},
				}))
			},
			setDayInterval: (data: TDayInterval) => {
				set((state) => ({
					dayInterval: {
						...state.dayInterval,
						...data
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
			name: 'habit-storage-v2',
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
				startDateUser: state.startDateUser,
				dayInterval: state.dayInterval,
				email: state.email,
				premium: state.premium,
			}),
			onRehydrateStorage: () => (state) => {
				state?.setHasHydrated(true)
			},
			migrate: (persistedState: any) => {
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