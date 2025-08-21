import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isoWeek from "dayjs/plugin/isoWeek";
import weekday from "dayjs/plugin/weekday";
import * as Notifications from 'expo-notifications';
import { DATE_FORMAT } from '../constants';

dayjs.extend(isoWeek);
dayjs.extend(weekday);
dayjs.extend(customParseFormat)
interface ISetNotifications {
    name: string,
    daysOfWeek?: Array<string>,
    daysInRow?: number,
    skipDays?: number,
    dayOfCreate?: string,
    habitId: string
    notid?: string | null,
    typeOfHabit?: string
}

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    })
})

const listWeek: Record<string, number> = {
    'Пн': 2,
    'Вт': 3,
    'Ср': 4,
    'Чт': 5,
    'Пт': 6,
    'Сб': 7,
    'Вс': 1,
}

export const GetPermissionAccess = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()

    console.log(existingStatus)

    if (existingStatus !== 'granted') {
        await Notifications.requestPermissionsAsync()
    }

    return existingStatus
}

export const CancelNotificationAsync = async (type: string, id: string, habitId: string) => {
    try {
        if (type === 'every_day') {
            try {
                await Notifications.cancelScheduledNotificationAsync(id)
            } catch (error) {
                const allNotifications = await Notifications.getAllScheduledNotificationsAsync()

                for (const notif of allNotifications) {
                    if (notif.content.data?.habitId === habitId) {
                        await Notifications.cancelScheduledNotificationAsync(notif.identifier);
                    }
                }
            }
        }

        if (type === 'certain_days' || type === 'gap') {

            const hid = JSON.parse(id)

            try {
                for (const i of hid) {
                    await Notifications.cancelScheduledNotificationAsync(i)
                }
            } catch (error) {
                const allNotifications = await Notifications.getAllScheduledNotificationsAsync()

                for (const notif of allNotifications) {
                    if (notif.content.data?.habitId === habitId) {
                        await Notifications.cancelScheduledNotificationAsync(notif.identifier);
                    }
                }
            }
        }
    } catch (error) {
        console.log(error)
    }
}

const SetNotifications = async (type: string, time: string, option: ISetNotifications) => {
    const [hour, minute] = time.split(':')

    if (option.typeOfHabit === 'onetime') {

        try {
            const notificationId = await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Напоминание',
                    body: `Пора выполнить ${option.name}`,
                    data: { habitId: option.habitId }
                },
                trigger: {
                    type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                    repeats: false,
                    seconds: 60 * (Number.isFinite(Number(minute)) ? Number(minute) : 1) * (Number.isFinite(Number(hour)) ? Number(hour) : 1)
                }
            })

            return notificationId
        } catch (error) {
            console.log(error)
        }
    }

    if (type === 'every_day') {

        try {
            if (option.notid) {
                await CancelNotificationAsync(type, option.notid, option.habitId)
            }

            const notificationId = await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Напоминание',
                    body: `Пора выполнить ${option.name}`,
                    data: { habitId: option.habitId }
                },
                trigger: {
                    type: Notifications.SchedulableTriggerInputTypes.DAILY,
                    hour: Number.isFinite(Number(hour)) ? Number(hour) : 0,
                    minute: Number.isFinite(Number(minute)) ? Number(minute) : 0
                }
            })

            return notificationId
        } catch (error) {
            console.log(error)
        }
    }

    if (type === 'certain_days' && option.daysOfWeek) {

        try {
            if (option.notid) {
                await CancelNotificationAsync(type, option.notid, option.habitId)
            }

            const notificationId = []

            for (const week of option.daysOfWeek) {
                const notid = await Notifications.scheduleNotificationAsync({
                    content: {
                        title: 'Напоминание',
                        body: `Пора выполнить ${option.name}`,
                        data: { habitId: option.habitId }
                    },
                    trigger: {
                        type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
                        weekday: listWeek[week],
                        hour: Number.isFinite(Number(hour)) ? Number(hour) : 0,
                        minute: Number.isFinite(Number(minute)) ? Number(minute) : 0
                    }
                })

                notificationId.push(notid)
            }

            return JSON.stringify(notificationId)
        } catch (error) {
            console.log(error)
        }
    }

    if (type === 'gap' && option.daysInRow && option.skipDays && option.dayOfCreate) {

        try {
            if (option.notid) {
                await CancelNotificationAsync(type, option.notid, option.habitId)
            }

            const cycleLength = option.daysInRow + option.skipDays
            const notificationId: string[] = []

            for (let i = 0; i <= 30; i++) {
                const cycleDay = i % cycleLength
                if (cycleDay < option.daysInRow) {
                    
                    const notifyDate = dayjs(option.dayOfCreate, DATE_FORMAT).add(i, 'day')

                    const hid = await Notifications.scheduleNotificationAsync({
                        content: {
                            title: 'Напоминание',
                            body: `Пора выполнить ${option.name}`,
                            data: {
                                habitId: option.habitId,
                                dayOfCreate: option.dayOfCreate,
                                skipDays: option.skipDays,
                                daysInRow: option.daysInRow,
                                untilDay: notifyDate.format(DATE_FORMAT),
                            }
                        },
                        trigger: {
                            type: Notifications.SchedulableTriggerInputTypes.MONTHLY,
                            day: Number(notifyDate.format('DD')),
                            hour: Number.isFinite(Number(hour)) ? Number(hour) : 0,
                            minute: Number.isFinite(Number(minute)) ? Number(minute) : 0
                        }
                    })

                    notificationId.push(hid)
                }
            }

            const jsonData = JSON.stringify(notificationId)

            return jsonData
        } catch (error) {
            console.log(error)
        }

    }

}

export default SetNotifications