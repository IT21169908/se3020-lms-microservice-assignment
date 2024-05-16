import { check } from "express-validator";
import mongoose from "mongoose";

export const EnrollmentValidations = {
    status: () => check('status')
        .trim()
        .isString()
        .not()
        .isEmpty()
        .withMessage('Status is required!'),
    enrollmentDate: () => check('enrollmentDate')
        .not()
        .isEmpty()
        .withMessage('Enrollment date is required!')
        .isISO8601()
        .toDate()
        .withMessage('Date must be in YYYY-MM-DD (ISO8601) format!'),
    courseId: (key = "courseId") => check(key)
        .not()
        .isEmpty()
        .withMessage(`Course ID cannot be empty`)
        .custom((v) => mongoose.isValidObjectId(v))
        .withMessage(`Course ID is not a valid mongoDb objectID`),
    learnerId: (key = "learnerId") => check(key)
        .not()
        .isEmpty()
        .withMessage(`Learner ID cannot be empty`)
        .custom((v) => mongoose.isValidObjectId(v))
        .withMessage(`Learner ID is not a valid mongoDb objectID`),
    enrollmentId: (key = "enrollmentId") => check(key)
        .not()
        .isEmpty()
        .withMessage(`Enrollment ID cannot be empty`)
        .custom((v) => mongoose.isValidObjectId(v))
        .withMessage(`Enrollment ID is not a valid mongoDb objectID`),
};
