import {Router} from "express";
import createHttpError from "http-errors";
import {RabbitMQService} from "../services/RrabbitMQService";


import env from "../config";
import CourseService from "../services/NotifyService";

const {LMS_SERVICE} = env

// TODO: test purposes
export function initRoutes(router: Router, rabbitMQ: RabbitMQService) {

    const courseService = new CourseService();
    // TODO: Listen to the events
    rabbitMQ.subscribeMessage(courseService)

    router.get('/test', (req, res) => {

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
        rabbitMQ.publishMessage(LMS_SERVICE, JSON.stringify(lmsPayload))


        res.json({lmsPayload: lmsPayload, message: "NOTIFY SERVICE TEST ROUTE™ API"});
    });


    /* INVALID REQUESTS */
    // app.get('/', (req: Request, res: Response) => res.redirect(301, "/api"));
    router.use((req, res, next) => next(new createHttpError.NotFound()));
    // app.all('*', (req: Request, res: Response) => res.send("Invalid Route").status(404));
}