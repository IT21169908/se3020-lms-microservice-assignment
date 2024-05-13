import { Types } from "mongoose";

export default class LMSRepository {
    public async createEnroll(data: DCourse, user?: Express.User): Promise<ICourse> {
        try {
            const iEnroll = new Enroll(data);
            const enroll = await iEnroll.save();
            AppLogger.info(`Create Enroll(ID: ${enroll._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
            return enroll;
        } catch (error: unknown) {
            if (error instanceof Error) {
                AppLogger.error(`Creating Enroll: ${error.message}`);
                throw new ApplicationError(`Creating enroll: ${error.message}`);
            }
            throw error;
        }
    }

    public async getAllEnrolls(user?: Express.User): Promise<ICourse[]> {
        const enrolls = await Enroll.find();
        if (enrolls) {
            AppLogger.info(`Got All Enrolls - Count: ${enrolls.length} by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
            return enrolls;
        } else {
            AppLogger.info(`Enrolls Not Found`);
            throw new ApplicationError(`Get all enrolls: Enrolls not found!`);
        }
    }

    public async getEnrollById(enrollId: Types.ObjectId, user?: Express.User): Promise<ICourse> {
        const enroll = await Enroll.findById(enrollId);
        if (enroll) {
            AppLogger.info(`Got Enroll(ID: ${enroll._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
            return enroll;
        } else {
            AppLogger.info(`Enroll(ID: ${enrollId}) Not Found`);
            throw new ApplicationError(`Get Enroll: Enroll not found for ID: ${enrollId} !`, 422);
        }
    }

    public async updateEnroll(enrollId: Types.ObjectId, enrollDetails: Partial<DCourse>, user?: Express.User): Promise<ICourse> {
        const updatedEnroll = await Enroll.findByIdAndUpdate(enrollId, enrollDetails as any, {new: true});
        if (updatedEnroll) {
            AppLogger.info(`Update Enroll(ID: ${updatedEnroll._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
            return updatedEnroll;
        } else {
            AppLogger.info(`Enroll(ID: ${enrollId}) Not Found`);
            throw new ApplicationError(`Update enroll: Enroll not found for ID: ${enrollId} !`, 422);
        }
    }

    public async deleteEnrollById(enrollId: Types.ObjectId, user?: Express.User): Promise<ICourse> {
        const deletedEnroll = await Enroll.findByIdAndDelete(enrollId);
        if (deletedEnroll) {
            AppLogger.info(`Got Delete Enroll(ID: ${deletedEnroll._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
            return deletedEnroll;
        } else {
            AppLogger.info(`Enroll(ID: ${enrollId}) not found`);
            throw new ApplicationError(`Delete enroll: Enroll not found for ID: ${enrollId} !`, 422);
        }
    }
}
