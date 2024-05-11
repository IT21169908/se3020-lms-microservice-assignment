import { DUser, IUser } from "./User.model";

interface CommonAttributes {
    lecturerId: string;
    department?: string;
    designation?: string;
    courses?: string[];
}

export interface DLecturer extends CommonAttributes, DUser {

}

export interface ILecturer extends CommonAttributes, IUser {
    readonly designation?: string;
}
