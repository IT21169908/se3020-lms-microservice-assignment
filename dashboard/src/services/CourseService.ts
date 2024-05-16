import axios from 'axios';
import Course from "../models/Courses";
import {AppResponse, AxiosAppResponse} from '../types/service-types/response';
import {ApiUtils} from "../utils/api-utils";

export class CourseService {

    private static authToken = JSON.parse(localStorage.getItem('authToken') || '');

    private static config = {
        headers: {
            'Authorization': 'Bearer ' + this.authToken
        }
    }

    static async getAllCourses(): Promise<AppResponse<Course[]>> {
        const ep = ApiUtils.lecturerCourseMSServiceUrl('courses');
        const response = await axios.get<Partial<Course>, AxiosAppResponse<Course[]>>(ep, this.config);
        if (response.data.success) {
            return response.data;
        } else {
            throw Error("Request failed with status: " + response.status + " message: " + response.data.error);
        }
    }

    static async getCourseById(id: string | undefined): Promise<AppResponse<any>> {
        const ep = ApiUtils.lecturerCourseMSServiceUrl(`courses/${id}`);
        const response = await axios.get<Partial<Course>, AxiosAppResponse<Course>>(ep, this.config);
        if (response.data.success) {
            return response.data;
        } else {
            throw Error("Request failed with status: " + response.status + " message: " + response.data.error);
        }
    }

    static async createCourse(data: Course): Promise<AppResponse<any>> {
        const ep = ApiUtils.lecturerCourseMSServiceUrl('courses');

        const response = await axios.post<Partial<Course>, AxiosAppResponse<any>>(ep, data, this.config);
        if (response.data.success) {
            return response.data;
        } else {
            throw Error("Request failed with status: " + response.status + " message: " + response.data.error);
        }
    }

    static async updateCourse(_id: string, data: Course) {
        const ep = ApiUtils.lecturerCourseMSServiceUrl('courses/' + _id);
        const response = await axios.put<Partial<Course>, AxiosAppResponse<any>>(ep, data, this.config);
        if (response.data.success) {
            return response.data;
        } else {
            throw Error("Request failed with status: " + response.status + " message: " + response.data.error);
        }
    }


    static async deleteCourse(_id: string) {
        const endpoint = ApiUtils.lecturerCourseMSServiceUrl(`courses/${_id}`);
        const response = await axios.delete(endpoint, this.config);
        if (response.data.success) {
            return response.data;
        } else {
            throw Error("Request failed with status: " + response.status + " message: " + response.data.error);
        }
    }

}
