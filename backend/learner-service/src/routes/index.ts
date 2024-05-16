import {Router} from "express";
import createHttpError from "http-errors";
import {RabbitMQService} from "../services/RrabbitMQService";

import LMSService from "../services/LMSService";
import {LearnerRoutesInit} from "./learner";

export async function initRoutes(router: Router) {

    const rabbitMQService = await RabbitMQService.getInstance()
    const lmsService = new LMSService(rabbitMQService);

    // TODO: Listen to the events
    await rabbitMQService.subscribeMessage(lmsService)

    router.get('', (req, res) => {
        res.json("Learner service™ API").status(200);
    });

    LearnerRoutesInit(router, lmsService);


    /* INVALID REQUESTS */
    // app.get('/', (req: Request, res: Response) => res.redirect(301, "/api"));
    router.use((req, res, next) => next(new createHttpError.NotFound()));
    // app.all('*', (req: Request, res: Response) => res.send("Invalid Route").status(404));
}
