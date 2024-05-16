import {Router} from "express";
import createHttpError from "http-errors";
import {RabbitMQService} from "../services/RrabbitMQService";


import env from "../config";
import CourseService from "../services/LMSService";
import {StudentRoutesInit} from "./student";

const {AUTH_SERVICE, COURSE_SERVICE} = env

// TODO: test purposes
export function initRoutes(router: Router, rabbitMQ: RabbitMQService) {

    const courseService = new CourseService();

    // TODO: Listen to the events
    rabbitMQ.subscribeMessage(courseService)

    router.get('/test', (req, res) => {

        const coursePayload = {
            event: "SAMPLE",
            data: {
                id: '65ffef24021037df10627bbd',
                name: 'SE3040',
                price: '295000',
                isActive: true,
            }
        }
        // TODO: Publish service events
        rabbitMQ.publishMessage(COURSE_SERVICE, JSON.stringify(coursePayload))
        StudentRoutesInit(router, courseService);


        res.json({coursePayload, message: "LMS SERVICE TEST ROUTE™ API"});
    });


    /* INVALID REQUESTS */
    // app.get('/', (req: Request, res: Response) => res.redirect(301, "/api"));
    router.use((req, res, next) => next(new createHttpError.NotFound()));
    // app.all('*', (req: Request, res: Response) => res.send("Invalid Route").status(404));
}
