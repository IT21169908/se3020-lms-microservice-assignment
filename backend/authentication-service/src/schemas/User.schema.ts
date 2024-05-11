import * as mongoose from "mongoose";
import { Schema } from "mongoose";
import * as bcrypt from 'bcryptjs';
import {Permission, Role} from "../enums/auth";
import { checkPermission } from "../middleware/validate-permissions";
import { IUser } from "../models/User.model";
import jwt from "jsonwebtoken";
import { AppLogger } from "../utils/logging";

export const UserSchemaOptions: mongoose.SchemaOptions = {
    _id: true,
    id: false,
    timestamps: true,
    skipVersioning: {
        updatedAt: true
    },
    strict: false,
    discriminatorKey: 'role',
    toJSON: {
        getters: true,
        virtuals: true,
        transform: (doc, ret) => {
            delete ret.password;
        }
    },
};

export const UserSchema = new mongoose.Schema({
    name: {
        type: Schema.Types.String,
        required: false,
    },
    email: {
        type: Schema.Types.String,
        unique: true,
        required: false,
    },
    password: {
        type: Schema.Types.String,
        required: false,
    },
    phone: {
        type: Schema.Types.String,
        required: false,
    },
    role: {
        type: Schema.Types.String,
        required: true,
    },
    permissions: [
        {
            type: Schema.Types.String,
            required: true,
            default: [],
        }
    ],
    lastLogin: {
        type: Schema.Types.Date,
        required: false,
    },
    photo: {
        type: Schema.Types.ObjectId,
        required: false,
        // ref: Upload.modelName
    },
    signedUpAs: {
        type: Schema.Types.String,
        required: false,
    },
    isActive: {
        type: Schema.Types.Boolean,
        required: true,
        default: true,
    },
    deactivateReasons: {
        type: [{
            reason: { type: Schema.Types.String, required: true },
            deactivatedAt: { type: Schema.Types.Date, required: true },
            deactivatedBy: { type: Schema.Types.Mixed, required: true }
        }],
        required: false,
        default: [],
    }
}, UserSchemaOptions);

UserSchema.pre<IUser>('save', function (next) {
    const user = this as IUser;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    // generate a salt
    bcrypt.genSalt(10, function (err: any, salt: any) {
        if (err) return next(err);
        if (user.password != null) {
            // hash the password using our new salt
            bcrypt.hash(user.password, salt, function (err: any, hash: string) {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        }
    });
});

UserSchema.methods.createAccessToken = function (expiresIn = "365 days") {
    const jwtSecret = process.env.JWT_SECRET || "";
    AppLogger.info(`User Access Token Created (Expires In: ${expiresIn})`);
    return jwt.sign({user_id: this._id}, jwtSecret, {expiresIn: expiresIn});
};

UserSchema.methods.comparePassword = function (password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.password, function (err: any, isMatch: boolean | PromiseLike<boolean>) {
            if (err) return reject(err);
            return resolve(isMatch);
        });
    });
};

UserSchema.methods.hasPermission = function (...permissions: Permission[]): boolean {
    const user = this as IUser;
    const [success] = checkPermission(user, permissions);
    return success;
};

const User = mongoose.model<IUser>('users', UserSchema);
export default User;
