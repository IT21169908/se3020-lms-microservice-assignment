import * as mongoose from "mongoose";
import {Schema} from "mongoose";
import { Role } from "../enums/auth";
import { IStudent } from "../models/Student.model";
import User, { UserSchemaOptions } from "./User.schema";

export const StudentSchema = new mongoose.Schema({
    studentId: {
        type:  Schema.Types.String,
        required: true
    },
    enrolledCourses: [
        {
            type:  Schema.Types.String,
            required: false
        }
    ],
    yearLevel: {
        type:  Schema.Types.String,
        required: false
    },
    department: {
        type:  Schema.Types.String,
        required: false
    },
    semesterGPA: {
        type:  Schema.Types.Number,
        required: false
    },
    overallGPA: {
        type:  Schema.Types.Number,
        required: false
    },
    extracurricularActivities: [
        {
            type: Schema.Types.String,
            required: false
        }
    ]
}, UserSchemaOptions);
export const Student = User.discriminator<IStudent>('students', StudentSchema, "0");

export default Student;
