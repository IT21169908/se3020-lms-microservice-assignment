import * as mongoose from "mongoose";
import {Schema} from "mongoose";
import {INotification} from "../models/Notification.model";

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

const NotificationSchema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    title: {
        type: Schema.Types.String,
        required: true,
    },
    message: {
        type: Schema.Types.String,
        required: true,
    },
    read: {
        type: Schema.Types.Boolean,
        default: false,
    },
    roles: {
        type: [Schema.Types.String],
        default: undefined,
    },
}, schemaOptions);

const Notification = mongoose.model<INotification>("notifications", NotificationSchema);

export default Notification;
