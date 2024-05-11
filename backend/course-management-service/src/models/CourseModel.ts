import * as mongoose from "mongoose";
import {StringOrObjectId} from "../types/custom-types";

interface CommonAttributes {
    name: string;
    code: string;
    description: string;
    credits: number;
    lecture_id: StringOrObjectId;
}

export interface DCourse extends CommonAttributes {
    _id?: StringOrObjectId;
    status: "active" | "inactive";
}

export interface ICourse extends CommonAttributes, mongoose.Document {
    status: "active" | "inactive";
}
