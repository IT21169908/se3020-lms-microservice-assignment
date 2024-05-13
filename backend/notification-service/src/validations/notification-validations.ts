import { check } from "express-validator";

export const NotificationValidations = {
    userId: () => check('user_id')
        .notEmpty()
        .withMessage('User ID is required!')
        .isMongoId()
        .withMessage('User ID must be a valid MongoDB ID'),

    title: () => check('title')
        .notEmpty()
        .withMessage('Title is required!')
        .isString()
        .withMessage('Title must be a string'),

    message: () => check('message')
        .notEmpty()
        .withMessage('Message is required!')
        .isString()
        .withMessage('Message must be a string'),
};
