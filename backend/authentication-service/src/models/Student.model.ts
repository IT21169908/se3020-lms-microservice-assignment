import { DUser, IUser } from "./User.model";

interface CommonAttributes {
    studentId: string;
    enrolledCourses?: string[];
    yearLevel?: string;
    department?: string;
    semesterGPA?: number;
    overallGPA?: number;
    extracurricularActivities?: string[];
}

export interface DStudent extends CommonAttributes, DUser {

}

export interface IStudent extends CommonAttributes, IUser {
    readonly semesterGPA?: number;
    readonly overallGPA?: number;
}
