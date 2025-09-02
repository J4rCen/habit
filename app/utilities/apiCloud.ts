import { apiLoadInCloud, apiSaveInCloud } from "../api/api"
import useStore, { IHabitTask } from "../store/zustand"
import SetNotifications, { GetPermissionAccess } from "./notifications"
import { getToken } from "./secureStore"

export const saveInCloud = async () => {
    try {
        const token = await getToken().then(token => { return token })
        const email = useStore.getState().email

        if (token && email) {
            const habitTasks = useStore.getState().habitTask
            const startDateUser = useStore.getState().startDateUser

            const data = {
                email: email,
                dateOfStart: startDateUser,
                userHabits: habitTasks
            }

            return await apiSaveInCloud(data)
        }

    } catch (error) {
        console.error(error)
    }
}

export const loadInCloud = async () => {
    try {
        const token = await getToken().then(token => { return token })
        const email = useStore.getState().email

        if (email && token) {
            const data = await apiLoadInCloud(email)

            if (data?.status as number == 0) {
                return {message: 'Превышено время ожидания, попробуйте позже ещё раз, если ошибка повториться обратитесь в службу поддержки', status: data.status }
            }

            if (!!data?.data.dateOfStart && !!data.data.userHabits && data.status >= 200) {

                useStore.getState().initializeStartDateUser(data.data.dateOfStart)
                useStore.getState().initializeHabits(data.data.userHabits)

                const permission = await GetPermissionAccess()

                if (permission === 'granted') {
                    Object.values(data.data.userHabits as IHabitTask).forEach((item: IHabitTask) => {

                        const habitConfig = item.habitConfig

                        if (habitConfig.reminder && habitConfig.interval_execution && habitConfig.reminder_time) {
                            SetNotifications(habitConfig.interval_execution, habitConfig.reminder_time, {
                                name: habitConfig.name,
                                daysOfWeek: habitConfig.days_of_week && null,
                                daysInRow: habitConfig.gap_interval?.days_in_row,
                                skipDays: habitConfig.gap_interval?.skip_days,
                                dayOfCreate: habitConfig.day_of_create,
                                habitId: item.habitId,
                                notid: habitConfig.notificationsId,
                                typeOfHabit: habitConfig.type_of_habit
                            })
                        }
                    })
                }

                return {message: data.data.message, status: data.data.status }

            }

            return {message: data?.data.message, status: data?.data.status }
            
        }
    } catch (error) {
        console.error(error)
    }
}