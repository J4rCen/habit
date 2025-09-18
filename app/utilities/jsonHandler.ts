import { isErrorWithCode, pick, saveDocuments } from '@react-native-documents/picker';
import dayjs from 'dayjs';
import RNFS from 'react-native-fs';
import useStore, { IHabitTask } from '../store/zustand';
import SetNotifications, { GetPermissionAccess } from './notifications';

interface IFileController {
	setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>,
	setTitlePopup:  React.Dispatch<React.SetStateAction<string>>,
	setMessagePopup: React.Dispatch<React.SetStateAction<string>>,
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const fileName = `track_habit_${dayjs().format('DD-MM-YYYY')}.json`
const path = `${RNFS.CachesDirectoryPath}/${fileName}`

export const saveFile = async (con: IFileController) => {
	try {

		con.setOpenPopup(true)
		con.setIsLoading(true)

		const habitTasks = useStore.getState().habitTask
		const startDateUser = useStore.getState().startDateUser
		const datInterval = useStore.getState().dayInterval

		const jsonData = JSON.stringify({
			dateOfStart: startDateUser,
			userHabits: habitTasks,
			dayInterval: datInterval
		})

		await RNFS.writeFile(path, jsonData, 'utf8');

		const [{uri: pathUri}] = await saveDocuments({
			sourceUris: [`file://${path}`],
			copy: false,
			mimeType: 'application/json',
			fileName: fileName
		})

		if (pathUri.length !== 0) {
			con.setTitlePopup('Успешно')
			con.setMessagePopup(`Файл успешно сохранен`)
		}

	} catch (err: unknown) {
		if (isErrorWithCode(err)) {
			
			if (err.code === 'OPERATION_CANCELED') {
				con.setTitlePopup('Отмена')
				con.setMessagePopup('Сохранения отменено')
			}

		} else {
			con.setTitlePopup('Ошибка')
			con.setMessagePopup('При сохранении произошла непредвиденная ошибка')
		}
		
	} finally {
		con.setIsLoading(false)
	}

}

export const loadFile = async (con: IFileController) => {
	try {

		con.setOpenPopup(true)
		con.setIsLoading(true)

		const [res] = await pick();
		const fileUri = res.uri;

		let path = fileUri;
		if (fileUri.startsWith('file://')) {
			const stat = await RNFS.stat(fileUri);
			path = stat.path;
		}

		const fileContents = await RNFS.readFile(path, 'utf8');

		const data = JSON.parse(fileContents);

		if ('dateOfStart' in data && 'userHabits' in data && 'dayInterval' in data) {
			useStore.getState().initializeStartDateUser(data.dateOfStart)
			useStore.getState().initializeHabits(data.userHabits)
			useStore.getState().setDayInterval(data.dayInterval)

			const permission = await GetPermissionAccess()

			if (permission === 'granted') {
				Object.values(data.userHabits as IHabitTask).forEach((item: IHabitTask) => {

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

			con.setTitlePopup('Успешно')
			con.setMessagePopup('Данные успешно восстановлены')
		} else {
			con.setTitlePopup('Ошибка')
			con.setMessagePopup('При восстановление данных произошла ошибка, проверьте формат файла')
		}

		
	} catch (err: unknown) {
		if (isErrorWithCode(err)) {
			
			if (err.code === 'OPERATION_CANCELED') {
				con.setTitlePopup('Отмена')
				con.setMessagePopup('Выбор файла отменен')
			}

		} else {
			con.setTitlePopup('Ошибка')
			con.setMessagePopup('При загрузки произошла непредвиденная ошибка')
		}
		
	} finally {
		con.setIsLoading(false)
	}
}