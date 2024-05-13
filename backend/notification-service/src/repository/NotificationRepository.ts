import {Types} from "mongoose";
import {DNotification, INotification} from "../models/Notification.model";

import Notification from "../schemas/Notification.schema";
import {AppLogger} from "../utils/logger";
import {ApplicationError} from "../exceptions/application-error";
import {getRoleTitle} from "../utils/helpers";

export async function createNotification(data: DNotification, user?: Express.User): Promise<INotification> {
    try {
        const iNotification = new Notification(data);
        const notification = await iNotification.save();
        AppLogger.info(`Create Notification(ID: ${notification._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return notification;
    } catch (error: unknown) {
        if (error instanceof Error) {
            AppLogger.error(`Creating Notification: ${error.message}`);
            throw new ApplicationError(`Creating notification: ${error.message}`);
        }
        throw error;
    }
}

export async function createNotifications(notifications: DNotification[]): Promise<void> {
    try {
        const notification = await Notification.insertMany(notifications);
        AppLogger.info(`Notification saved`);

    } catch (error: unknown) {
        if (error instanceof Error) {
            AppLogger.error(`Creating Notification: ${error.message}`);
            throw new ApplicationError(`Creating notification: ${error.message}`);
        }
        throw error;
    }
}

export async function getAllNotifications(user?: Express.User): Promise<INotification[]> {
    const notifications = await Notification.find();
    if (notifications) {
        AppLogger.info(`Got All Notifications - Count: ${notifications.length} by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return notifications;
    } else {
        AppLogger.info(`Notifications Not Found`);
        throw new ApplicationError(`Get all notifications: Notifications not found!`);
    }
}

export async function getNotifications(user?: Express.User): Promise<INotification[]> {
    const notifications = await Notification.find({user_id: user?._id});
    if (notifications) {
        AppLogger.info(`Got All Notifications - Count: ${notifications.length} by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return notifications;
    } else {
        AppLogger.info(`Notifications Not Found`);
        throw new ApplicationError(`Get all notifications: Notifications not found!`);
    }
}

export async function getNotificationById(notificationId: Types.ObjectId, user?: Express.User): Promise<INotification> {
    const notification = await Notification.findById(notificationId);
    if (notification) {
        AppLogger.info(`Got Notification(ID: ${notification._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return notification;
    } else {
        AppLogger.info(`Notification(ID: ${notificationId}) Not Found`);
        throw new ApplicationError(`Get Notification: Notification not found for ID: ${notificationId} !`, 422);
    }
}

export async function updateNotification(notificationId: Types.ObjectId, notificationDetails: Partial<DNotification>, user?: Express.User): Promise<INotification> {
    const updatedNotification = await Notification.findByIdAndUpdate(notificationId, notificationDetails as any, {new: true});
    if (updatedNotification) {
        AppLogger.info(`Update Notification(ID: ${updatedNotification._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return updatedNotification;
    } else {
        AppLogger.info(`Notification(ID: ${notificationId}) Not Found`);
        throw new ApplicationError(`Update notification: Notification not found for ID: ${notificationId} !`, 422);
    }
}

export async function deleteNotificationById(notificationId: Types.ObjectId, user?: Express.User): Promise<INotification> {
    const deletedNotification = await Notification.findByIdAndDelete(notificationId);
    if (deletedNotification) {
        AppLogger.info(`Got Delete Notification(ID: ${deletedNotification._id}) by ${getRoleTitle(user?.role)} (ID: ${user?._id})`);
        return deletedNotification;
    } else {
        AppLogger.info(`Notification(ID: ${notificationId}) not found`);
        throw new ApplicationError(`Delete notification: Notification not found for ID: ${notificationId} !`, 422);
    }
}
