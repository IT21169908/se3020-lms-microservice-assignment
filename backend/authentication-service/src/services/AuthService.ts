import {RabbitMQService} from "./RrabbitMQService";
import env from "../config";
import {NextFunction, Request, Response} from "express";

class AuthService {

    private rabbitMQ: RabbitMQService;

    constructor(rabbitMQ: RabbitMQService) {
        this.rabbitMQ = rabbitMQ;
    }

    async SubscribeEvents(payload: string): Promise<void> {
        console.log('Triggering.... AuthService Events');

        const parsedPayload: PayloadData = JSON.parse(payload);

        const {event, data} = parsedPayload;
        const {username, password, confirmPassword, remember} = data;

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
}

interface PayloadData {
    event: string;
    data: {
        username: string;
        password: string;
        confirmPassword: string;
        remember?: boolean;
    };
}

export default AuthService;
