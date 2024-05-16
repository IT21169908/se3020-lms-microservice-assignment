import * as mongoose from "mongoose";
import { Schema } from "mongoose";
import { IEnrollment } from "../models/Enrollment.model";

const schemaOptions: mongoose.SchemaOptions = {
    _id: true,
    id: false,
    timestamps: true,
    skipVersioning: {
        updatedAt: true
    },
    strict: true,
    toJSON: {
        getters: true,
        virtuals: true,
    },
};

export const EnrollmentSchema = new mongoose.Schema({
    learnerId: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    enrollmentDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['enrolled', 'withdrawn', 'completed'],
        default: 'enrolled'
    },
}, schemaOptions);

const Enrollment = mongoose.model<IEnrollment>("enrollments", EnrollmentSchema);

export default Enrollment;
