import {NextFunction, Request, Response} from "express";
import {Types} from "mongoose";
import * as NotificationDao from "../repository/NotificationRepository";
import {DNotification} from "../models/Notification.model";

import {validationsChecker} from "../validations/validation-handler";
import {NotificationValidations} from "../validations/notification-validations";

// ================ VALIDATIONS ================
export function createNotificationValidationRules() {
    return [
        NotificationValidations.userId(),
        NotificationValidations.title(),
        NotificationValidations.message(),
    ];
}

// ================ CREATE - C ================
export async function create(req: Request, res: Response, next: NextFunction) {
    const validationRules = createNotificationValidationRules();
    await Promise.all(validationRules.map(validation => validation.run(req)));

    if (validationsChecker(req, res)) {
        const {user_id, title, message, roles}: DNotification = req.body;
        const read = false;
        const data: DNotification = {
            user_id: user_id,
            title: title,
            message: message,
            roles: roles,
            read: read
        };
        await NotificationDao.createNotification(data).then(notification => {
            res.sendSuccess(notification, "Notification created successfully!");
        }).catch(next);
    }
}

export async function createBulkNotifications(notifications: DNotification[]): Promise<void> {
    try {
        await NotificationDao.createNotifications(notifications);
    } catch (error) {
        throw new Error(`Error creating notifications`);
    }
}

// ================ READ - R ================
export async function getMyNotifications(req: Request, res: Response, next: NextFunction) {
    const user = req.user;
    await NotificationDao.getNotifications(user).then(notifications => {
        res.sendSuccess(notifications, "Get all notifications successfully!");
    }).catch(next);
}

export async function getAllNotifications(req: Request, res: Response, next: NextFunction) {
    const user = req.user;
    await NotificationDao.getAllNotifications(user).then(notifications => {
        res.sendSuccess(notifications, "Get all notifications successfully!");
    }).catch(next);
}

export function getNotificationById(req: Request, res: Response, next: NextFunction) {
    if (validationsChecker(req, res)) {
        const user = req.user;
        const notificationId = req.params._id as unknown as Types.ObjectId;
        NotificationDao.getNotificationById(notificationId, user).then(notification => {
            res.sendSuccess(notification, "Get notification by ID successfully!");
        }).catch(next);
    }
}

// ================ UPDATE - U ================
export async function updateNotification(req: Request, res: Response, next: NextFunction) {
    if (validationsChecker(req, res)) {
        const user = req.user;
        const notificationId = req.params._id as unknown as Types.ObjectId;
        const {user_id, title, message, read, roles}: Partial<DNotification> = req.body;
        const notificationDetails: Partial<DNotification> = {
            user_id: user_id,
            title: title,
            message: message,
            read: read,
            roles: roles
        };
        await NotificationDao.updateNotification(notificationId, notificationDetails, user).then(notification => {
            res.sendSuccess(notification, "Notification updated successfully!");
        }).catch(next);
    }
}

// ================ DELETE - D ================
export function deleteNotification(req: Request, res: Response, next: NextFunction) {
    if (validationsChecker(req, res)) {
        const notificationId = req.params._id as unknown as Types.ObjectId;
        const user = req.user;
        NotificationDao.deleteNotificationById(notificationId, user).then(notification => {
            res.sendSuccess(notification, "Notification deleted successfully!");
        }).catch(next);
    }
}
