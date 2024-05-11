import {Express} from "express";
import createHttpError from "http-errors";
import {RabbitMQService} from "../services/RrabbitMQService";
import AuthService from "../services/AuthService";
import {AuthRoutesInit} from "./auth";

// TODO: test purposes
export function initRoutes(app: Express, rabbitMQ: RabbitMQService) {

    const authService = new AuthService(rabbitMQ);
    rabbitMQ.subscribeMessage(authService); // TODO: Listen to the events

    AuthRoutesInit(app, authService);

    /* INVALID REQUESTS */
    // app.get('/', (req: Request, res: Response) => res.redirect(301, "/api"));
    app.use((req, res, next) => next(new createHttpError.NotFound()));
    // app.all('*', (req: Request, res: Response) => res.send("Invalid Route").status(404));
}
