import {PopulateOptions, Types} from "mongoose";
import {Role, SignedUpAs} from "../enums/auth";
import {AuthUserData} from "../types/util-types";
import User from "../schemas/User.schema";
import {AppLogger} from "../utils/logging";
import {ApplicationError} from "../utils/application-error";
import {IUser} from "../models/User.model";

export default class UserRepository {

    private commonPopulates: PopulateOptions[] = [{path: 'photo'}];
    private adminPopulates = [...this.commonPopulates];
    private facultyPopulates = [...this.commonPopulates];
    private studentPopulates = [...this.commonPopulates];

    private getPopulatesForRole(role: Role): PopulateOptions[] {
        switch (role) {
            case Role.ADMIN:
                return this.adminPopulates;
            case Role.LECTURER:
                return this.facultyPopulates;
            case Role.STUDENT:
                return this.studentPopulates;
            default:
                return this.commonPopulates;
        }
    }

    async authenticateUser(email: string, password: string, signedUpAs: string | undefined, tokenValidityTime: string): Promise<AuthUserData> {
        if (signedUpAs === SignedUpAs.EMAIL) {
            const user = await User.findOne({email: email});
            if (user) {
                const isMatch = await user.comparePassword(password);
                if (!isMatch) {
                    AppLogger.error(`User logging failed, Incorrect credentials: ${email}`);
                    throw new ApplicationError('Incorrect email/password combination!');
                }
                AppLogger.info(`User logged in as ${signedUpAs} ID: ${user._id}`);
                const token = user.createAccessToken(tokenValidityTime);
                return {token: token, user: user};
            } else {
                AppLogger.error(`User logging failed, Not found with: ${email}`);
                throw new ApplicationError('User not found in the system!');
            }
        } else if (signedUpAs === SignedUpAs.FACEBOOK) {
            // TODO: facebook
            AppLogger.info(`User tried to login by ${signedUpAs}`);
            throw new ApplicationError('Please login with email for now!');
        } else if (signedUpAs === SignedUpAs.GOOGLE) {
            // TODO: google
            AppLogger.info(`User tried to login by ${signedUpAs}`);
            throw new ApplicationError('Please login with email for now!');
        } else {
            throw new ApplicationError('Unsupported sign-up method!');
        }
    }

    async getUserByEmail(email: string): Promise<IUser | null> {
        const user = await User.findOne({email}).populate(this.commonPopulates);
        AppLogger.info(`Got user for id, userID: ${user ? user._id : null}`);
        if (user) {
            const populates = this.getPopulatesForRole(user.role);
            // return user.populate(populates).execPopulate();
            return user.populate(populates);
        } else {
            return null;
        }
    }

     async getUser(id: Types.ObjectId): Promise<IUser> {
        const user = await User.findById(id).populate(this.commonPopulates);
        if (!user) {
            throw new ApplicationError("User not found for ID: " + id);
        }
        AppLogger.info(`Got user for id, userID: ${user._id}`);
        user.lastLoggedIn = new Date();
        await user.save();
        const populates = this.getPopulatesForRole(user.role);
        // await user.populate(populates).execPopulate();
        await user.populate(populates);
        return user;
    }

     async update(userId: Types.ObjectId, userDetails: Partial<IUser>, ownUser: IUser): Promise<IUser> {
        const updatedUser = await User.findByIdAndUpdate(userId, userDetails, {new: true});
        if (updatedUser) {
            AppLogger.info(`Updated user (ID: ${updatedUser._id}) by ${Role.getTitle(ownUser.role)} (ID: ${ownUser?._id})`);
            return updatedUser;
        } else {
            AppLogger.error(`Update user: Not found user (ID: ${userId})`);
            throw new ApplicationError(`Update user: User not found for ID: ${userId} !`);
        }
    }

     async deactivate(userId: Types.ObjectId, ownUser: IUser): Promise<IUser> {
        const selectedUser = await User.findById(userId);
        if (selectedUser) {
            if (parseInt(selectedUser?.role.toString()) === Role.ADMIN) {
                AppLogger.error(`Deactivate user: cannot deactivate admin users (ID: ${userId})`);
                throw new ApplicationError(`Deactivate user: Cannot Deactivate admin user for ID: ${userId} !`);
            }

            const reason = {
                reason: "Self Deactivation",
                deactivatedAt: new Date(),
                deactivatedBy: ownUser._id
            };
            if (!selectedUser.deactivateReasons) {
                selectedUser.deactivateReasons = [reason];
            } else {
                selectedUser.deactivateReasons?.push(reason);
            }
            selectedUser.isActive = false;
            await selectedUser.save();

            AppLogger.info(`Deactivated user (ID: ${selectedUser._id}) by ${Role.getTitle(ownUser.role)} (ID: ${ownUser._id})`);
            return selectedUser;
        }

        AppLogger.error(`Deactivate user: User not found (ID: ${userId})`);
        throw new ApplicationError(`Deactivate user: User not found for ID: ${userId} !`);
    }

}
