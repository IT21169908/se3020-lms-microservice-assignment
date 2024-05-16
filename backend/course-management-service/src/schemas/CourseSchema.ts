import * as mongoose from "mongoose";
import {Schema} from "mongoose";
import {ICourse} from "../models/CourseModel";

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

const CourseSchema = new mongoose.Schema({
    name: {
        type: Schema.Types.String,
        required: true,
    },
    code: {
        type: Schema.Types.String,
        required: true,
    },
    description: {
        type: Schema.Types.String,
        required: true,
    },
    credits: {
        type: Schema.Types.Number,
        required: true,
    },
    fee: {
        type: Schema.Types.Number,
        required: true,
    },
    lecture_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: Schema.Types.String,
        enum: ["active", "inactive"],
        required: true,
    },
}, schemaOptions);

const Course = mongoose.model<ICourse>("courses", CourseSchema);

export default Course;
