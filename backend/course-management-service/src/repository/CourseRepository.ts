import {Types} from "mongoose";
import {DCourse, ICourse} from "../models/CourseModel";

import Course from "../schemas/CourseSchema";
import {AppLogger} from "../utils/logger";
import {ApplicationError} from "../exceptions/application-error";
import {getRoleTitle} from "../utils/helpers";

export default class CourseRepository {
    public async createCourse(data: DCourse, user?: Express.User): Promise<ICourse> {
        try {
            const iCourse = new Course(data);
            const course = await iCourse.save();
            AppLogger.info(`Create Course(ID: ${course._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
            return course;
        } catch (error: unknown) {
            if (error instanceof Error) {
                AppLogger.error(`Creating Course: ${error.message}`);
                throw new ApplicationError(`Creating course: ${error.message}`);
            }
            throw error;
        }
    }

    public async getAllCourses(user?: Express.User): Promise<ICourse[]> {
        const courses = await Course.find();
        if (courses) {
            AppLogger.info(`Got All Courses - Count: ${courses.length} by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
            return courses;
        } else {
            AppLogger.info(`Courses Not Found`);
            throw new ApplicationError(`Get all courses: Courses not found!`);
        }
    }

    public async getCourseById(courseId: Types.ObjectId, user?: Express.User): Promise<ICourse> {
        const course = await Course.findById(courseId);
        if (course) {
            AppLogger.info(`Got Course(ID: ${course._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
            return course;
        } else {
            AppLogger.info(`Course(ID: ${courseId}) Not Found`);
            throw new ApplicationError(`Get Course: Course not found for ID: ${courseId} !`, 422);
        }
    }

    public async getCoursesByLecturerId(lecturerId: Types.ObjectId, user?: Express.User): Promise<ICourse[]> {
        const courses = await Course.find({lecture_id: lecturerId});

        if (courses.length > 0) {
            AppLogger.info(`Courses Found for Lecturer(ID: ${lecturerId}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
            return courses;
        } else {
            AppLogger.info(`No Courses Found for Lecturer(ID: ${lecturerId})`);
            // You can choose to throw an error if no courses are found or return an empty array based on your application's requirements
            throw new ApplicationError(`No courses found for Lecturer ID: ${lecturerId}`, 404);
        }
    }

    public async updateCourse(courseId: Types.ObjectId, courseDetails: Partial<DCourse>, user?: Express.User): Promise<ICourse> {
        const updatedCourse = await Course.findByIdAndUpdate(courseId, courseDetails as any, {new: true});
        if (updatedCourse) {
            AppLogger.info(`Update Course(ID: ${updatedCourse._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
            return updatedCourse;
        } else {
            AppLogger.info(`Course(ID: ${courseId}) Not Found`);
            throw new ApplicationError(`Update course: Course not found for ID: ${courseId} !`, 422);
        }
    }

    public async deleteCourseById(courseId: Types.ObjectId, user?: Express.User): Promise<ICourse> {
        const deletedCourse = await Course.findByIdAndDelete(courseId);
        if (deletedCourse) {
            AppLogger.info(`Got Delete Course(ID: ${deletedCourse._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
            return deletedCourse;
        } else {
            AppLogger.info(`Course(ID: ${courseId}) not found`);
            throw new ApplicationError(`Delete course: Course not found for ID: ${courseId} !`, 422);
        }
    }

}
