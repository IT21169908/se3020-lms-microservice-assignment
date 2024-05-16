import {DEnrollment, IEnrollment} from "../models/Enrollment.model";
import Enrollment from "../schemas/Enrollment.schema";
import {AppLogger} from "../utils/logger";
import {ApplicationError} from "../utils/application-error";
import {getRoleTitle} from "../utils/helpers";
import {Types} from "mongoose";

export default class LMSRepository {

    async enrollLearner(data: DEnrollment, user?: Express.User): Promise<IEnrollment> {
        try {
            const iEnrollment = new Enrollment(data);
            const enrollment = await iEnrollment.save();
            AppLogger.info(`Enroll learner (ID: ${enrollment._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
            return enrollment;
        } catch (error: unknown) {
            if (error instanceof Error) {
                AppLogger.error(`Enrolling learner: ${error.message}`);
                throw new ApplicationError(`Enrolling learner: ${error.message}`);
            }
            throw error;
        }
    }

    async getEnrollmentsByCourses(courseIds: Types.ObjectId[]): Promise<IEnrollment[]> {
        const enrollments = await Enrollment.find({courseId: {$in: courseIds}});

        if (enrollments.length > 0) {
            AppLogger.info(`Got Enrollments for Courses - Count: ${enrollments.length}`);
            return enrollments;
        } else {
            AppLogger.info(`Enrollments Not Found for Courses`);
            throw new ApplicationError(`No enrollments found for the specified courses`);
        }


    }

}
