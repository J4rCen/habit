import { isErrorWithCode, pick, saveDocuments } from '@react-native-documents/picker';
import dayjs from 'dayjs';
import * as FileSystem from 'expo-file-system';
import useStore, { IHabitTask } from '../store/zustand';
import SetNotifications, { GetPermissionAccess } from './notifications';

interface IFileController {
	setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>,
	setTitlePopup: React.Dispatch<React.SetStateAction<string>>,
	setMessagePopup: React.Dispatch<React.SetStateAction<string>>,
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const fileName = `track_habit_${dayjs().format('DD-MM-YYYY')}.json`
const path = `${FileSystem.cacheDirectory}/${fileName}`

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

		await FileSystem.writeAsStringAsync(path, jsonData, { encoding: 'utf8' });

		const [{ uri: pathUri }] = await saveDocuments({
			sourceUris: [`file://${path}`],
			copy: false,
			mimeType: 'application/json',
			fileName: fileName
		})

		if (pathUri.length !== 0) {
			con.setTitlePopup('settings.successfully')
			con.setMessagePopup(`settings.fileSuccessfullySaved`)
		}

	} catch (err: unknown) {
		if (isErrorWithCode(err)) {

			if (err.code === 'OPERATION_CANCELED') {
				con.setTitlePopup('createHabit.cancel')
				con.setMessagePopup('settings.fileSaveCanceled')
			}

		} else {
			con.setTitlePopup('settings.error')
			con.setMessagePopup('settings.fileSaveError')
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

		if (!path.startsWith('file://')) {
			const fileName = res.name || 'imported.json';
			const newPath = FileSystem.cacheDirectory + fileName;
			await FileSystem.copyAsync({ from: path, to: newPath });
			path = newPath;
		}

		if (!path.toLowerCase().endsWith('.json')) {
			con.setTitlePopup('settings.error')
			con.setMessagePopup('settings.restoringDataError')
			return;
		}

		const fileContents = await FileSystem.readAsStringAsync(path, { encoding: 'utf8' });
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

			con.setTitlePopup('settings.successfully')
			con.setMessagePopup('settings.fileRestoreSuccessfully')
		} else {
			con.setTitlePopup('settings.error')
			con.setMessagePopup('settings.restoringDataError')
		}


	} catch (err: unknown) {
		if (isErrorWithCode(err)) {

			if (err.code === 'OPERATION_CANCELED') {
				con.setTitlePopup('settings.error')
				con.setMessagePopup('settings.selectFileCanceled')
			}

		} else {
			con.setTitlePopup('settings.error')
			con.setMessagePopup('settings.fileLoadingError')
		}

	} finally {
		con.setIsLoading(false)
	}
}