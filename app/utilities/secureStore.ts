import * as SecureStore from 'expo-secure-store';
import { ACCESS_TOKEN } from '../constants';

export const setToken = async (token: string) => {
    try {
        await SecureStore.setItemAsync(ACCESS_TOKEN, token, {
            keychainAccessible: SecureStore.WHEN_UNLOCKED,
        });
    } catch (error) {
        console.error('Ошибка при сохранение токена: ', error)
    }
}

export const getToken = async () => {
    try {
        const token = SecureStore.getItemAsync(ACCESS_TOKEN);
        return await token;
    } catch (error) {
        console.error('Ошибка при получение токена: ', error)
    }
}

export const deleteToken = async () => {
    try {
        await SecureStore.deleteItemAsync(ACCESS_TOKEN);
    } catch (error) {
        console.error('Ошибка при удаление токена: ', error);
    }
};