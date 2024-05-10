import {Router} from "express";
import createHttpError from "http-errors";
import {RabbitMQService} from "../services/RrabbitMQService";


import env from "../config";
import CourseService from "../services/CourseService";

const {AUTH_SERVICE} = env

// TODO: test purposes
export function initRoutes(router: Router, rabbitMQ: RabbitMQService) {

    const courseService = new CourseService();
    // TODO: Listen to the events
    rabbitMQ.subscribeMessage(courseService)

    router.get('/test', (req, res) => {

        const payload = {
            event: "LOGIN",
            data: {
                username: 'navod',
                password: '1234567',
                confirmPassword: '1234567',
                remember: true,
            }
        }

        // TODO: Publish service events
        rabbitMQ.publishMessage(AUTH_SERVICE, JSON.stringify(payload))


        res.json({...payload, message: "COURSE SERVICE TEST ROUTE™ API"});
    });


    /* INVALID REQUESTS */
    // app.get('/', (req: Request, res: Response) => res.redirect(301, "/api"));
    router.use((req, res, next) => next(new createHttpError.NotFound()));
    // app.all('*', (req: Request, res: Response) => res.send("Invalid Route").status(404));
}