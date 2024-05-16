import {RabbitMQService} from "./RrabbitMQService";
import env from "../config";
import {NextFunction, Request, Response} from "express";
import {ObjectId, Types} from "mongoose";

import {Permission, Role} from "../enums/auth";

class AuthService {

    private rabbitMQ: RabbitMQService;

    constructor(rabbitMQ: RabbitMQService) {
        this.rabbitMQ = rabbitMQ;
    }

    async SubscribeEvents(payload: string): Promise<void> {
        console.log('Triggering.... AuthService Events');

        const parsedPayload: PayloadData = JSON.parse(payload);

        const {event, data} = parsedPayload;

        switch (event) {
            case 'LOGIN':
                this.login(parsedPayload);
                break;
            default:
                break;
        }
    }

    private login(parsedPayload: PayloadData): void {
        // Implement your logic here
        console.log(`user login: `, parsedPayload);
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
        //
        // // TODO: Publish service events
        try {
            this.rabbitMQ.publishMessage(env.COURSE_SERVICE, JSON.stringify(coursePayload))
            this.rabbitMQ.publishMessage(env.NOTIFY_SERVICE, JSON.stringify(notifyPayload))
        } catch (e) {
            res.sendError({err: e, message: "AUTH SERVICE TEST ROUTE™ API Err"});
        }
        res.sendSuccess({coursePayload, notifyPayload,}, "AUTH SERVICE TEST ROUTE™ API");

        // res.json({coursePayload, notifyPayload, message: "AUTH SERVICE TEST ROUTE™ API"});
    }


     async registerUser(req: Request, res: Response, next: NextFunction) {
        if (validationsChecker(req, res)) {
            const { role, email, superAdminToken = null } = req.body;
            const user = await UserDao.getUserByEmail(email);
            AppLogger.info(`New user tried to register as ${role} by ${email}`);

            if (user) {
                AppLogger.error(`User already exits!`);
                res.sendError('User Already Exits!', 409);
            } else {
                if (role === Role.STUDENT) {
                    try {
                        await StudentEp.register(req, res, next);
                    } catch (e) {
                        ErrorLogger.error(`User registration: ${e}`);
                        res.sendError(e);
                    }
                } else if (role === Role.LECTURER) {
                    try {
                        await FacultyEp.register(req, res, next);
                    } catch (e) {
                        ErrorLogger.error(`User registration: ${e}`);
                        res.sendError(e);
                    }
                } else if (role === Role.ADMIN) {
                    if (superAdminToken) {
                        try {
                            await AdminEp.register(req, res, next);
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

     async getAll(req: Request, res: Response, next: NextFunction) {
        const ownUser = req.user as IUser;
        if (ownUser) {
            AppLogger.info(`Get all users`);
            await UserDao.getAllUsers(ownUser).then(user => {
                res.sendSuccess(user, "Get all Users successfully!");
            }).catch(next);
        } else {
            ErrorLogger.error(`Get all users: Illegal attempt`);
            res.sendError(`Illegal attempt!`, 403);
        }
    }

    getSelf(req: Request, res: Response, next: NextFunction) {
        const ownUser = req.user as IUser;
        if (ownUser) {
            UserDao.getUser(ownUser._id).then((user: IUser) => {
                res.sendSuccess(user);
            }).catch(next);
        } else {
            ErrorLogger.error(`Get self: Illegal attempt`);
            res.sendError(`Illegal attempt!`, 403);
        }
    }

    getUser(req: Request, res: Response, next: NextFunction) {
        if (validationsChecker(req, res)) {
            const userId = req.params._id as unknown as Types.ObjectId;
            UserDao.getUser(userId).then(user => {
                res.sendSuccess(user, "Get user by ID successfully!");
            }).catch(next);
        }
    }

     async updateSelf(req: Request, res: Response, next: NextFunction) {
        if (validationsChecker(req, res)) {
            const {email, phone, name} = req.body;
            const emailCheckUser = await UserDao.getUserByEmail(email);
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
                    await UserDao.update(ownUser._id, userDetails, ownUser).then(user => {
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

     async update(req: Request, res: Response, next: NextFunction) {
        if (validationsChecker(req, res)) {
            const _id = req.params._id as unknown as Types.ObjectId;
            const {email, phone, name} = req.body;
            const emailCheckUser = await UserDao.getUserByEmail(email);
            const user = await UserDao.getUser(_id);
            const ownUser = req.user as IUser;

            if (ownUser) {
                AppLogger.warn(`emailCheckUser ID: ${emailCheckUser?._id} | update user ID: ${user?._id}`);
                AppLogger.warn(`emailCheckUser: ${emailCheckUser?.email} | update user: ${user?.email}`);

                if (!emailCheckUser || emailCheckUser._id.equals(user._id)) {
                    const userDetails: Partial<IUser> = {
                        email: email,
                        phone: phone,
                        name: name,
                    };
                    await UserDao.update(_id, userDetails, ownUser).then(user => {
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

    destroy(req: Request, res: Response, next: NextFunction) {
        if (validationsChecker(req, res)) {
            const user_id = req.params._id as unknown as Types.ObjectId;
            const ownUser = req.user as IUser;
            if (ownUser) {
                UserDao.destroy(user_id, ownUser).then(user => {
                    res.sendSuccess(user, "User deleted successfully!");
                }).catch(next);
            } else {
                ErrorLogger.error(`Delete user: Illegal attempt`);
                res.sendError(`Illegal attempt!`, 403);
            }
        }
    }

    deactivate(req: Request, res: Response, next: NextFunction) {
        const ownUser = req.user as IUser;
        if (ownUser) {
            UserDao.deactivate(ownUser._id, ownUser).then(user => {
                res.sendSuccess(user, "User deactivated successfully!");
            }).catch(next);
        } else {
            ErrorLogger.error(`Deactivate user: Illegal attempt`);
            res.sendError(`Illegal attempt!`, 403);
        }
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
