import { DUser, IUser } from "./User.model";

interface CommonAttributes {
    adminId: string;
    nic: string;
}

export interface DAdmin extends CommonAttributes, DUser {
    actions?: [
        {
            action: string,
            actionAt: Date,
        }
    ],
}

export interface IAdmin extends CommonAttributes, IUser {
   readonly adminId: string;
   readonly nic: string;
}
