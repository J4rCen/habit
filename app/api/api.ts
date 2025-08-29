import axios from 'axios'

class Api {
    private readonly baseUrl: string
    constructor() {
        this.baseUrl = 'http://192.168.0.28:3000/api/'
    }

    async registration(data: {email: string, password: string}) {
        try {
            return axios.post(this.baseUrl + 'auth/registration', {...data})
            .then(data => {
                return data
            })
            .catch(err => {
                return err.response
            })
        } catch (error) {
            console.log(error)
        }
    }

    async authorization(data: {email: string, password: string}) {
        try {
            return axios.post(this.baseUrl + 'auth/authorization', {...data})
            .then(data => {
                return data
            })
            .catch(err => {
                return err.response
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export default new Api()