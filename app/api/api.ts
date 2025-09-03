import axios from 'axios';
import { getToken } from '../utilities/secureStore';

// 'https://habit-backend-lhq9.onrender.com/api/'
// 'http://192.168.0.28:3000/api/'

const api = axios.create({
	baseURL: 'http://192.168.0.28:3000/api/',
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	},
	timeout: 10000
})

api.interceptors.request.use(async (config) => {
	const token = await getToken().then(token => { return token });
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export const apiRegistration = async (data: { email: string; password: string }) => {
	try {
		const response = await api.post('auth/registration', data);
		return response;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response) {
				console.log('Error response:', error.response);
				return error.response;
			} else if (error.request) {
				console.log('No response received:', error.request);
			} else {
				console.log('Axios config error:', error.message);
			}
		} else {
			console.log('Unexpected error:', error);
		}
	}
}

export const apiAuthorization = async (data: { email: string, password: string }) => {
	try {
		const response = await api.post('auth/authorization', data);
		return response;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response) {
				console.log('Error response:', error.response);
				return error.response;
			} else if (error.request) {
				console.log('No response received login:', error.request);
				return error.request;
			} else {
				console.log('Axios config error:', error.message);
			}
		} else {
			console.log('Unexpected error:', error);
		}
	}
};

export const apiSaveInCloud = async (data: any) => {
	try {
		const response = await api.post('habit/save', data);
		return response;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response) {
				console.log('Error response:', error.response);
				return error.response;
			} else if (error.request) {
				console.log('No response received:', error.request);
				return error.request;
			} else {
				console.log('Axios config error:', error.message);
			}
		} else {
			console.log('Unexpected error:', error);
		}
	}
}

export const apiLoadInCloud = async (data: any) => {
	try {
		const response = await api.post('habit/load', { email: data });
		return response;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response) {
				console.log('Error response:', error.response);
				return error.response;
			} else if (error.request) {
				console.log('No response received:', error.request);
				return error.request;
			} else {
				console.log('Axios config error:', error.message);
			}
		} else {
			console.log('Unexpected error:', error);
		}
	}
}