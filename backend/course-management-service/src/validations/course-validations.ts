import {check} from "express-validator";
import mongoose from "mongoose";

export const CourseValidations = {
    
    courseId: (key: string = "_id") => check(key)
        .not()
        .isEmpty()
        .withMessage(`${key} cannot be empty`)
        .custom((v) => mongoose.isValidObjectId(v))
        .withMessage(`${key} is not a valid mongoDb objectID`),

    name: () => check('name')
        .trim()
        .isString()
        .not()
        .isEmpty()
        .withMessage('Name is required!'),

    code: () => check('code')
        .trim()
        .isString()
        .not()
        .isEmpty()
        .withMessage('Module Code is required!'),

    description: () => check('description')
        .trim()
        .isString()
        .not()
        .isEmpty()
        .withMessage('Description is required!'),

    credits: () => check('credits')
        .not()
        .isEmpty()
        .withMessage('Credits is required!')
        .isNumeric()
        .withMessage('Credits should be a number!'),
    fee: () => check('fee')
        .not()
        .isEmpty()
        .withMessage('Fee is required!')
        .isNumeric()
        .withMessage('Fee should be a number!'),

    lecturerId: (key: string = "lecturer_id") => check(key)
        .not()
        .isEmpty()
        .withMessage(`${key} cannot be empty`)
        .custom((value) => mongoose.Types.ObjectId.isValid(value))
        .withMessage(`${key} is not a valid MongoDB ObjectID`),

    status: () =>
        check("status")
            .not()
            .isEmpty()
            .withMessage("status is required!")
            .trim()
            .isString()
            .isIn(["active", "inactive"])
            .withMessage("Invalid status!"),
};
