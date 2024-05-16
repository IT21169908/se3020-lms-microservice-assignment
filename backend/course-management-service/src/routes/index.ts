import {Router} from "express";
import createHttpError from "http-errors";
import {RabbitMQService} from "../services/RrabbitMQService";


import CourseService from "../services/CourseService";
import {CourseRoutesInit} from "./course";
import {RPCObserver} from "../services/RPCService";
import env from "../config";


// TODO: test purposes
export async function initRoutes(router: Router) {

    const rabbitMQService = await RabbitMQService.getInstance()
    const courseService = new CourseService(rabbitMQService);
    // TODO: Listen to the events
    await rabbitMQService.subscribeMessage(courseService)
    await RPCObserver(env.COURSE_RPC, courseService);

    router.get('', (req, res) => {
        res.json("Course Management service™ API").status(200);
    });

    router.get('/test', courseService.test);
    CourseRoutesInit(router, courseService);

    /* INVALID REQUESTS */
    // app.get('/', (req: Request, res: Response) => res.redirect(301, "/api"));
    router.use((req, res, next) => next(new createHttpError.NotFound()));
    // app.all('*', (req: Request, res: Response) => res.send("Invalid Route").status(404));
}