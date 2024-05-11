import {Router} from "express";
import createHttpError from "http-errors";
import {RabbitMQService} from "../services/RrabbitMQService";


import CourseService from "../services/CourseService";


// TODO: test purposes
export async function initRoutes(router: Router) {

    const rabbitMQService = await RabbitMQService.getInstance()
    const courseService = new CourseService(rabbitMQService);

    // TODO: Listen to the events
    await rabbitMQService.subscribeMessage(courseService)

    router.get('/test', courseService.test);


    /* INVALID REQUESTS */
    // app.get('/', (req: Request, res: Response) => res.redirect(301, "/api"));
    router.use((req, res, next) => next(new createHttpError.NotFound()));
    // app.all('*', (req: Request, res: Response) => res.send("Invalid Route").status(404));
}