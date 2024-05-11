import * as mongoose from "mongoose";
import { StringOrObjectId } from "../types/util-types";
import {Permission, Role, SignedUpAs} from "../enums/auth";
import { IUpload } from "./Upload.model";

interface CommonAttributes {
    name: string;
    email: string;
    password: string;
    phone?: string;
    permissions?: Permission[];
    role?: Role;
    lastLoggedIn?: Date;
    signedUpAs? : SignedUpAs;
    isActive? : boolean;
    deactivateReasons? : [
        {
            reason: string,
            deactivatedAt: Date,
            deactivatedBy: StringOrObjectId,
        }
    ];
}

export interface DUser extends CommonAttributes {
    _id?: StringOrObjectId;
    photo?: StringOrObjectId;
}

export interface IUser extends CommonAttributes, mongoose.Document {
    readonly role: Role;
    readonly permissions: Permission[];
    lastLoggedIn: Date;
    photo?: IUpload;

    createAccessToken(expiresIn?: string): string;

    comparePassword(password: string): Promise<boolean>;

    hasPermission(...permissions: Permission[]): boolean;
}
