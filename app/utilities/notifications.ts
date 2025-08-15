import * as Notifications from 'expo-notifications'
// import dayjs from 'dayjs'
// import { DATE_FORMAT } from '../constants'

interface ISetNotifications {
    name: string,
    daysOfWeek?: Array<string>,
    daysInRow?: number,
    skipDays?: number,
    dayOfCreate?: string,
    habitId: string
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

    if (existingStatus !== 'granted') {
        await Notifications.requestPermissionsAsync()
    }
}

export const RefreshPatternNotifications = async () => {

}

export const CancelNotificationAsync = async (type: string, id: string, habitName: string) => {

    if (type === 'every_day') {
        try {
            await Notifications.cancelScheduledNotificationAsync(id)
        } catch (error) {
            const allNotifications = await Notifications.getAllScheduledNotificationsAsync()

            for (const notif of allNotifications) {
                if (notif.content.data?.habitId === habitName) {
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
                if (notif.content.data?.habitId === habitName) {
                    await Notifications.cancelScheduledNotificationAsync(notif.identifier);
                }
            }
        }
    }
}

const SetNotifications = async (type: string, time: string, option: ISetNotifications) => {

    const [hour, minute] = time.split(':')

    if (type === 'every_day') {
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
    }

    if (type === 'certain_days' && option.daysOfWeek) {

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
    }

    if (type === 'gap' && option.daysInRow && option.skipDays && option.dayOfCreate) {

        const cycleLength = option.daysInRow + option.skipDays
        const notificationId: string[] = []

        for (let i = 0; i < 10; i++) {
            const cycleDay = i % cycleLength

            if (cycleDay < option.daysInRow) {

                const notifyDate = new Date(option.dayOfCreate);
                notifyDate.setDate(Number(option.dayOfCreate) + i);

                const hid = await Notifications.scheduleNotificationAsync({
                    content: {
                        title: 'Напоминание',
                        body: `Пора выполнить ${option.name}`,
                        data: { habitId: option.habitId }
                    },
                    trigger: {
                        type: Notifications.SchedulableTriggerInputTypes.MONTHLY,
                        day: notifyDate.getDay(),
                        hour: Number.isFinite(Number(hour)) ? Number(hour) : 0,
                        minute: Number.isFinite(Number(minute)) ? Number(minute) : 0
                    }
                })

                notificationId.push(hid)
            }
        }

        return JSON.stringify(notificationId)

    }

}

export default SetNotifications