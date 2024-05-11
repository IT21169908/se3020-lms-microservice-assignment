import { User } from '@/models/User';
import {AppResponse, AxiosAppResponse} from '@/types/service-types/response';
import axios from 'axios';
import {ApiUtils} from "@/utils/api-utils";
import { UserLoginData } from '@/types/service-types/auth';

export class AuthService {

    private static authToken = JSON.parse(localStorage.getItem('authToken') || '');

    private static config = {
        headers: {
            'Authorization': 'Bearer ' + this.authToken
        }
    }

    public static getToken(): string | null {
        return localStorage.getItem("authToken");
    }

    public static async getOwnUser(): Promise<AppResponse<User>> {
        axios.interceptors.request.use(req => {
            req.headers.authorization = 'Bearer ' + localStorage.getItem('authToken');
            return req;
        });
        const ep = ApiUtils.authUrl('me');
        const res = await axios.get<void, AxiosAppResponse<User>>(ep);
        if (res.data.error) {
            localStorage.removeItem("authToken");
        }
        return res.data;
    }

    public static async signInWithEmail(userLoginData: UserLoginData): Promise<AppResponse<string>> {
        const ep = ApiUtils.publicUrl('login');
        const res = await axios.post<UserLoginData, AxiosAppResponse<string>>(ep, userLoginData);
        if (res.data.success) {
            localStorage.setItem("authToken", res.data.data);
        }
        return res.data;
    }

    public static async signUpWithEmail(userLoginData: UserLoginData): Promise<AppResponse<string>> {
        try {
            const ep = ApiUtils.publicUrl('register');
            const res = await axios.post<UserLoginData, AxiosAppResponse<string>>(ep, userLoginData);
            if (res.data.success) {
                localStorage.setItem("authToken", res.data.data);
            }
            return res.data;
        } catch (error: any) {
            if (error.response) {
                const errorData = error.response.data;
                console.error(`Request failed with status code ${error.response.status}: ${errorData.error}`);
                throw new Error(errorData.error);
            } else if (error.request) {
                console.error(`No response received: ${error.request}`);
                throw new Error('No response received');
            } else {
                console.error(`Error setting up request: ${error.message}`);
                throw new Error(error.message);
            }
        }
    }

    public static async updateUser(data: any): Promise<AppResponse<User>> {
        const ep = ApiUtils.authUrl('user/update');
        const res = await axios.post<User, AxiosAppResponse<User>>(ep, data);
        return res.data;
    }

    public static logout(): void {
        //TODO read token from cookie and remove this implementation
        localStorage.removeItem("authToken");
    }

}
