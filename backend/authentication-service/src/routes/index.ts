import {Router} from "express";
import createHttpError from "http-errors";
import {RabbitMQService} from "../services/RrabbitMQService";
import AuthService from "../services/AuthService";

import env from "../config" ;

const {AUTH_SERVICE} = env

export function initRoutes(router: Router, rabbitMQ: RabbitMQService) {

    const authService = new AuthService;
    // TODO: Listen to the events
    rabbitMQ.subscribeMessage(authService)

    router.get('/test', (req, res) => {
        // TODO: test purposes
        // const payload = {
        //     event: "LOGIN",
        //     data: {
        //         username: 'navod',
        //         password: '1234567',
        //         confirmPassword: '1234567',
        //         remember: true,
        //     }
        // }

        // TODO: Publish service events
        // rabbitMQ.publishMessage(AUTH_SERVICE, JSON.stringify(payload))

        res.json("AUTH SERVICE TEST ROUTE™ API");
    });


    /* INVALID REQUESTS */
    // app.get('/', (req: Request, res: Response) => res.redirect(301, "/api"));
    router.use((req, res, next) => next(new createHttpError.NotFound()));
    // app.all('*', (req: Request, res: Response) => res.send("Invalid Route").status(404));
}