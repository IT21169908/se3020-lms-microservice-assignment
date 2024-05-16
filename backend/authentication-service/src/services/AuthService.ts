import {RabbitMQService} from "./RrabbitMQService";
import env from "../config";
import {NextFunction, Request, Response} from "express";
import {ObjectId} from "mongoose";

import {Permission, Role, SignedUpAs} from "../enums/auth";
import {validationsChecker} from "../middleware/validations/validation-handler";
import UserRepository from "../repository/UserRepository";
import {AuthUserData} from "../types/util-types";
import {Time} from "../enums/time";
import {AppLogger, ErrorLogger} from "../utils/logging";
import {DStudent} from "../models/Student.model";
import {DUser, IUser} from "../models/User.model";
import Student from "../schemas/Student.schema";
import {DLecturer} from "../models/Lecturer.model";
import Lecturer from "../schemas/Lecturer.schema";
import {DAdmin} from "../models/Admin.model";
import Admin from "../schemas/Admin.schema";

class AuthService {

    private readonly rabbitMQ: RabbitMQService;
    private readonly userRepository: UserRepository;

    constructor(rabbitMQ: RabbitMQService) {
        this.rabbitMQ = rabbitMQ;
        this.userRepository = new UserRepository()
    }

    async SubscribeEvents(payload: string): Promise<void> {
        console.log('Triggering.... AuthService Events');

        const parsedPayload: PayloadData = JSON.parse(payload);

        const {event, data} = parsedPayload;

        switch (event) {
            case 'SAMPLE':
                this.sample(parsedPayload);
                break;
            default:
                break;
        }
    }

    public sample(payload: any) {
        console.log("Sample event");
    }

    public tester(req: Request, res: Response, next: NextFunction) {
        const coursePayload = {
            event: "SAMPLE",
            data: {
                id: '65ffef24021037df10627bbd',
                name: 'SE3040',
                price: '295000',
                isActive: true,
            }
        }
        const notifyPayload = {
            event: "SAMPLE",
            data: {
                "_id": "66006615f455579a2f713fa9",
                "user_id": "66004de7d5dd17b8991741e5",
                "title": "Timetable Change",
                "message": "The timetable for one of your courses has been updated.",
                "read": false,
                "roles": [
                    "Student"
                ],
            }
        }

        //Publish service events
        try {
            this.rabbitMQ.publishMessage(env.COURSE_SERVICE, JSON.stringify(coursePayload))
            this.rabbitMQ.publishMessage(env.NOTIFY_SERVICE, JSON.stringify(notifyPayload))
        } catch (e) {
            res.sendError({err: e, message: "AUTH SERVICE TEST ROUTE™ API Err"});
        }
        res.sendSuccess({coursePayload, notifyPayload,}, "AUTH SERVICE TEST ROUTE™ API");
    }

    async loginUser(req: Request, res: Response, next: NextFunction) {
        const {email, password, signedUpAs, remember} = req.body;

        if (validationsChecker(req, res)) {
            this.userRepository.authenticateUser(email, password, signedUpAs, this.authTokenValidity(remember))
                .then(async (data: AuthUserData) => {
                    res.cookie('token', data.token, {
                        httpOnly: true,
                        secure: false,
                        maxAge: Time.getDaysIn(Time.Milliseconds, this.authTokenValidity(remember))
                    });
                    res.sendSuccess(data, `User logged as ${Role.getTitle(data.user.role)}!`);
                })
                .catch(next);
        }
    }

    async registerUser(req: Request, res: Response, next: NextFunction) {
        if (validationsChecker(req, res)) {
            const {role, email, superAdminToken = null} = req.body;
            const user = await this.userRepository.getUserByEmail(email);
            AppLogger.info(`New user tried to register as ${role} by ${email}`);

            if (user) {
                AppLogger.error(`User already exists!`);
                res.sendError('User Already Exists!', 409);
            } else {
                if (role === Role.STUDENT) {
                    try {
                        await this.registerStudent(req, res, next);
                    } catch (e) {
                        ErrorLogger.error(`User registration: ${e}`);
                        res.sendError(e);
                    }
                } else if (role === Role.LECTURER) {
                    try {
                        await this.registerLecturer(req, res, next);
                    } catch (e) {
                        ErrorLogger.error(`User registration: ${e}`);
                        res.sendError(e);
                    }
                } else if (role === Role.ADMIN) {
                    if (superAdminToken) {
                        try {
                            await this.registerAdmin(req, res, next);
                        } catch (e) {
                            ErrorLogger.error(`User registration: ${e}`);
                            res.sendError(e);
                        }
                    } else {
                        AppLogger.error(`Unauthorized Role!`);
                        res.sendError('Unauthorized Role!');
                    }
                } else {
                    AppLogger.error(`Role Required!`);
                    res.sendError('Role Required!');
                }
            }
        }
    }

    async registerStudent(req: Request, res: Response, next: NextFunction) {
        const {_id: id, role, name, email, password, studentId, remember} = req.body;
        const data: DStudent = {
            studentId: studentId,
            name: name,
            email: email,
            password: password,
            signedUpAs: SignedUpAs.EMAIL,
            lastLoggedIn: new Date(),
            // role: Role.STUDENT, // Role set in schema
            permissions: Role.getPermissions(Role.STUDENT),
        };
        this.createStudentProfile(data, !!remember).then(async (data: AuthUserData) => {
            AppLogger.info(`User registered as ${Role.getTitle(role)} ID: ${id}`);
            res.sendSuccess(data, `User Registered as ${Role.getTitle(role)}!`);
        }).catch(next);
    }

    async createStudentProfile(data: DUser & Partial<DStudent>, remember: boolean): Promise<AuthUserData> {
        const iStudent = new Student(data);
        const student = await iStudent.save();
        AppLogger.info(`Create profile for user ID: ${student._id}`);
        // TODO fire event to send emails
        return await this.userRepository.authenticateUser(data.email, data.password, data.signedUpAs, this.authTokenValidity(remember));
    }

    async registerLecturer(req: Request, res: Response, next: NextFunction) {
        const {_id: id, role, name, email, password, facultyId, remember} = req.body;
        const data: DLecturer = {
            lecturerId: facultyId,
            name: name,
            email: email,
            password: password,
            signedUpAs: SignedUpAs.EMAIL,
            lastLoggedIn: new Date(),
            // role: Role.FACULTY, // Role set in schema
            permissions: Role.getPermissions(Role.LECTURER),
        };
        this.createLecturerProfile(data, !!remember).then(async (data: AuthUserData) => {
            AppLogger.info(`User registered as ${Role.getTitle(role)} ID: ${id}`);
            res.sendSuccess(data, `User Registered as ${Role.getTitle(role)}!`);
        }).catch(next);
    }

    async createLecturerProfile(data: DUser & Partial<DLecturer>, remember: boolean): Promise<AuthUserData> {
        const iFaculty = new Lecturer(data);
        const faculty = await iFaculty.save();
        AppLogger.info(`Create profile for user ID: ${faculty._id}`);
        // TODO fire event to send emails
        return await this.userRepository.authenticateUser(data.email, data.password, data.signedUpAs, this.authTokenValidity(remember));
    }

    async registerAdmin(req: Request, res: Response, next: NextFunction) {
        const {_id: id, role, name, email, password, adminId, nic, superAdminToken, remember} = req.body;
        if (superAdminToken && superAdminToken === process.env.SUPER_ADMIN_TOKEN) {
            AppLogger.info(`User registering by super admin token (Email: ${email})`);
            const data: DAdmin = {
                nic: nic,
                adminId: adminId,
                name: name,
                email: email,
                password: password,
                signedUpAs: SignedUpAs.EMAIL,
                lastLoggedIn: new Date(),
                // role: Role.ADMIN, // Role set in schema
                permissions: Role.getPermissions(Role.ADMIN),
            };
            this.createAdminProfile(data, !!remember).then(async (data: AuthUserData) => {
                AppLogger.info(`User registered as ${Role.getTitle(role)} ID: ${id}`);
                res.sendSuccess(data, `User Registered as ${Role.getTitle(role)}!`);
            }).catch(next);
        } else {
            AppLogger.error(`Try user registering as Admin (Token: ${superAdminToken})`);
            ErrorLogger.error(`User registering as Admin: Illegal attempt`);
            res.sendError(`Illegal attempt!`, 403);
        }
    }

    async createAdminProfile(data: DUser & Partial<DAdmin>, remember: boolean): Promise<AuthUserData> {
        const iAdmin = new Admin(data);
        const admin = await iAdmin.save();
        AppLogger.info(`Create profile for user ID: ${admin._id}`);
        // TODO fire event to send emails
        return await this.userRepository.authenticateUser(data.email, data.password, data.signedUpAs, this.authTokenValidity(remember));
    }

    async updateSelf(req: Request, res: Response, next: NextFunction) {
        if (validationsChecker(req, res)) {
            const {email, phone, name} = req.body;
            const emailCheckUser = await this.userRepository.getUserByEmail(email);
            const ownUser = req.user as IUser;

            if (ownUser) {
                AppLogger.warn(`emailCheckUser ID: ${emailCheckUser?._id} | update user ID: ${ownUser._id}`);
                AppLogger.warn(`emailCheckUser: ${emailCheckUser?.email} | update user: ${ownUser.email}`);

                if (!emailCheckUser || emailCheckUser._id.equals(ownUser._id)) {
                    const userDetails: Partial<IUser> = {
                        email: email,
                        phone: phone,
                        name: name,
                    };
                    await this.userRepository.update(ownUser._id, userDetails, ownUser).then(user => {
                        res.sendSuccess(user, "User updated successfully!");
                    }).catch(next);
                } else {
                    res.sendError(`User email already exists`, 422);
                }
            } else {
                ErrorLogger.error(`Update user: Illegal attempt`);
                res.sendError(`Illegal attempt!`, 403);
            }
        }
    }

    async deactivate(req: Request, res: Response, next: NextFunction) {
        const ownUser = req.user as IUser;
        if (ownUser) {
            this.userRepository.deactivate(ownUser._id, ownUser).then(user => {
                res.sendSuccess(user, "User deactivated successfully!");
            }).catch(next);
        } else {
            ErrorLogger.error(`Deactivate user: Illegal attempt`);
            res.sendError(`Illegal attempt!`, 403);
        }
    }

    async getSelf(req: Request, res: Response, next: NextFunction) {
        const ownUser = req.user as IUser;
        if (ownUser) {
            this.userRepository.getUser(ownUser._id).then((user: IUser) => {
                res.sendSuccess(user);
            }).catch(next);
        } else {
            ErrorLogger.error(`Get self: Illegal attempt`);
            res.sendError(`Illegal attempt!`, 403);
        }
    }

    private authTokenValidity(remember: boolean): string {
        return remember ? "365 days" : "1 day";
    }
}

interface PayloadData {
    event: string;
    data: {
        _id: ObjectId;
        name: string;
        email: string;
        phone?: string;
        signedUpAs?: string;
        readonly role: Role;
        permissions: Permission[];
        lastLoggedIn: Date;
    };
}

export default AuthService;
