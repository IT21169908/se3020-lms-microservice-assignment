import {NextFunction, Request, Response} from "express";
import {RabbitMQService} from "./RrabbitMQService";

import env from "../config";

const {AUTH_SERVICE, LMS_SERVICE} = env

class CourseService {

    private readonly rabbitMQ: RabbitMQService;

    constructor(rabbitMQ: RabbitMQService) {
        this.rabbitMQ = rabbitMQ;
        this.test = this.test.bind(this);
    }

    public test(req: Request, res: Response, next: NextFunction) {
        console.log(this.rabbitMQ)
        const authPayload = {
            event: "LOGIN",
            data: {
                username: 'navod',
                password: '1234567',
                confirmPassword: '1234567',
                remember: true,
            }
        }

        const lmsPayload = {
            event: "SAMPLE",
            data: {
                "_id": "6600535b01e929e77376118d",
                "user_id": "66004de7d5dd17b8991741e5",
                "course_id": "65ffef1b021037df10627bba",
                "status": "approved",
            }
        }

        // TODO: Publish service events
        this.rabbitMQ.publishMessage(AUTH_SERVICE, JSON.stringify(authPayload))
        this.rabbitMQ.publishMessage(LMS_SERVICE, JSON.stringify(lmsPayload))


        res.sendSuccess({authPayload: authPayload, lmsPayload: lmsPayload,}, "COURSE SERVICE TEST ROUTE™ API");
    }

    async SubscribeEvents(payload: string): Promise<void> {
        console.log('Triggering.... CoursesService Events');

        const parsedPayload: PayloadData = JSON.parse(payload);

        const {event, data} = parsedPayload;
        const {id, name, price, isActive} = data;

        switch (event) {
            case 'SAMPLE':
                this.sample(parsedPayload);
                break;
            default:
                break;
        }
    }

    private sample(parsedPayload: PayloadData): void {
        // Implement your logic here
        console.log(`CourseService sample SubscribeEvents parsedPayload: `, parsedPayload);
    }
}

interface PayloadData {
    event: string;
    data: {
        id: string;
        name: string;
        price: string;
        isActive: boolean;
    };
}

export default CourseService