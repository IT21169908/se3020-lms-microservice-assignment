import {Router} from "express";
import createHttpError from "http-errors";
import {RabbitMQService} from "../services/RrabbitMQService";
import AuthService from "../services/AuthService";

import env from "../config";

const {COURSE_SERVICE} = env

// TODO: test purposes
export function initRoutes(router: Router, rabbitMQ: RabbitMQService) {

    const authService = new AuthService;
    // TODO: Listen to the events
    rabbitMQ.subscribeMessage(authService)

    router.get('/test', (req, res) => {
        const payload = {
            event: "SAMPLE",
            data: {
                id: '65ffef24021037df10627bbd',
                name: 'SE3040',
                price: '295000',
                isActive: true,
            }
        }

        // TODO: Publish service events
        rabbitMQ.publishMessage(COURSE_SERVICE, JSON.stringify(payload))

        res.json({...payload, message: "COURSE SERVICE TEST ROUTE™ API"});
    });


    /* INVALID REQUESTS */
    // app.get('/', (req: Request, res: Response) => res.redirect(301, "/api"));
    router.use((req, res, next) => next(new createHttpError.NotFound()));
    // app.all('*', (req: Request, res: Response) => res.send("Invalid Route").status(404));
}