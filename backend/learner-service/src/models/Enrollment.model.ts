import * as mongoose from "mongoose";
import {StringOrObjectId} from "../utils/util-types";

interface CommonAttributes {
    learnerId: StringOrObjectId;
    courseId: StringOrObjectId;
    enrollmentDate: Date;
    status: "enrolled" | "withdrawn" | "completed";
}

export interface DEnrollment extends CommonAttributes {
    _id?: StringOrObjectId;
    learnerId: StringOrObjectId;
    courseId: StringOrObjectId;
    status: "enrolled" | "withdrawn" | "completed";
}

export interface IEnrollment extends CommonAttributes, mongoose.Document {
    status: "enrolled" | "withdrawn" | "completed";
}
