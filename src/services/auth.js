import axios from 'axios';
import process from 'process';


class ApiClient {

    constructor() {
         return axios.create({
            baseURL: import.meta.env.VITE_API_URL,
            credentials: true,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
    }
}

export default class AuthApi {

    /**
     * 
     * @param data 
     * @return AxiosResponse
     */
    login(data) {
        let client = new ApiClient();

        return client.post('/auth/login', data)
    }
    /**
     * Logout a user
     * @returns success message
     */
    logout() {
        let data = {
            access_token: localStorage.getItem('auth_token')
        }

        let client = new ApiClient();

        return client.post('/auth/logout', data)
    }
      /**
     * Forgot Password
     * @param data 
     * @return AxiosResponse
     */
      forgotPassword(data) {
        let client = new ApiClient();

        return client.post('/auth/forgot-password', data)
    }

      /**
     * Reset Password
     * @param data 
     * @return AxiosResponse
     */
      resetPassword(data) {
        let client = new ApiClient();

        return client.post('/auth/reset-password', data)
    }
}