import * as mongoose from "mongoose";
import {Schema} from "mongoose";
import { Role } from "../enums/auth";
import { IAdmin } from "../models/Admin.model";
import User, { UserSchemaOptions } from "./User.schema";

export const AdminSchema = new mongoose.Schema({
    adminId: {
        type:  Schema.Types.String,
        required: true
    },
    nic: {
        type:  Schema.Types.String,
        required: true
    },
    actions: {
        type: [{
            action: { type: Schema.Types.String, required: true },
            actionAt: { type: Schema.Types.Date, required: true },
        }],
        required: false,
        default: [],
    }
}, UserSchemaOptions);

export const Admin = User.discriminator<IAdmin>('admins', AdminSchema, "1");

export default Admin;
