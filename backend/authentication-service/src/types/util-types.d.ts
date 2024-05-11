import * as mongoose from "mongoose";
import { IUser } from "../models/User.model";
import Mail from "nodemailer/lib/mailer";
import {EmailType} from "../enums/util";

export type ObjectIdOr<T extends mongoose.Document> = mongoose.Types.ObjectId | T;

export type StringOrObjectId = string | mongoose.Types.ObjectId;

export interface AuthUserData {
    token: string,
    user: IUser
}

interface EmailOption extends Mail.Options {
    type: EmailType,
}

export type EmailOptions = Mail.Options;
export type AppEmailOptions = EmailOption;


export interface EmailNotificationData {
    user: IUser,
    subject: string,
    message: string,
}
