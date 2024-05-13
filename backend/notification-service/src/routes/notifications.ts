import {Express} from 'express';
import * as NotificationController from "../services/NotificationService";

export function NotificationRoutesInit(app: Express) {
    /* AUTH ROUTES ===================================== */
    app.get('/notifications', NotificationController.getMyNotifications);
    app.get('/notifications/:_id', NotificationController.getNotificationById);

    /* ADMIN ROUTES ===================================== */
    app.get('/notifications/admin', NotificationController.getAllNotifications);
    app.post('/notifications/admin', NotificationController.createNotificationValidationRules(), NotificationController.create);
    app.delete('/notifications/admin/:_id', NotificationController.deleteNotification);
}
