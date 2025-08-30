import axios, { AxiosError } from 'axios'

const api = axios.create({
    baseURL: 'https://habit-backend-lhq9.onrender.com/api/',
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
