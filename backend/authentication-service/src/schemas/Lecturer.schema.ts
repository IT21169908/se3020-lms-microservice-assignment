import * as mongoose from "mongoose";
import {Schema} from "mongoose";
import { Role } from "../enums/auth";
import User, { UserSchemaOptions } from "./User.schema";
import {ILecturer} from "../models/Lecturer.model";

export const LecturerSchema = new mongoose.Schema({
    lecturerId: {
        type:  Schema.Types.String,
        required: true
    },
    department: {
        type:  Schema.Types.String,
        required: false
    },
    designation: {
        type: Schema.Types.String,
        required: false
    },
    courses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Course'
        }
    ],
}, UserSchemaOptions);

export const Lecturer = User.discriminator<ILecturer>('lecturers', LecturerSchema, "2");

export default Lecturer;
