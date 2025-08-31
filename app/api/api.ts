import axios, { AxiosError } from 'axios'

// 'https://habit-backend-lhq9.onrender.com/api/'

const api = axios.create({
    baseURL: 'http://192.168.0.28:3000/api/',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})

export const apiRegistration = async (data: { email: string, password: string }) => {
    return await api.post('auth/registration', data)
        .then(data => {
            return data
        })
        .catch((err: AxiosError) => {
            return err.response
        })
}

export const apiAuthorization = async (data: { email: string, password: string }) => {
    return await api.post('auth/authorization', data)
        .then(data => {
            return data
        })
        .catch(err => {
            return err.response
        })
}

export const apiSaveInCloud = async (data: any) => {
    return await api.post('habit/save', data)
        .then(data => {
            return data
        })
        .catch(err => {
            return err.response
        })
}

export const apiLoadInCloud = async (data: any) => {
    return await api.post('habit/load', {email: data})
        .then(data => {
            return data.data
        })
        .catch(err => {
            return err.response
        })
}