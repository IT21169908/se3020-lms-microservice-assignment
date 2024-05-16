import {Types} from "mongoose";

class LMSService {

    async SubscribeEvents(payload: string): Promise<void> {
        console.log('Triggering.... LMSService Events');

        const parsedPayload: PayloadData = JSON.parse(payload);

        const {event, data} = parsedPayload;
        const {_id, user_id, course_id, status} = data;

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
        console.log(`LMSService sample SubscribeEvents parsedPayload: `, parsedPayload);
    }


     async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        const ownUser = req.user as IUser;
        if (ownUser) {
            AppLogger.info(`Get all enrolles`);
            await EnrollDao.getEnrolls(ownUser).then(enrolles => {
                res.sendSuccess(enrolles, "Get all enrolles successfully!");
            }).catch(next);
        } else {
            ErrorLogger.error(`Get all courses: Illegal attempt`);
            res.sendError(`Illegal attempt!`, 403);
        }
    }

     async getEnroll(req: Request, res: Response, next: NextFunction): Promise<void> {
        if (validationsChecker(req, res)) {
            const ownUser = req.user as IUser;
            if (ownUser) {
                const enrollId = req.params.enrollId as unknown as Types.ObjectId;
                await EnrollDao.getEnrollById(enrollId, ownUser).then(enroll => {
                    res.sendSuccess(enroll, "Get enroll by ID successfully!");
                }).catch(next);
            } else {
                ErrorLogger.error(`Get enroll: Illegal attempt`);
                res.sendError(`Illegal attempt!`, 403);
            }
        }
    }

     async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        if (validationsChecker(req, res)) {
            const ownUser = req.user as IUser;
            if (ownUser && [Role.ADMIN, Role.LECTURER].includes(parseInt(ownUser.role.toString()))) {
                const { session, time, date, courseId, facultyId, location } = req.body;
                const data: DEnroll = {
                    session: session,
                    courseId: courseId,
                    time: time,
                    date: date,
                    facultyId: facultyId,
                    location: location,
                };
                await EnrollDao.createEnroll(data, ownUser).then(enroll => {
                    res.sendSuccess(enroll, "Enroll added successfully!");
                }).catch(next);
            } else {
                ErrorLogger.error(`Create enroll: Illegal attempt`);
                res.sendError(`Illegal attempt!`, 403);
            }
        }
    }

     async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        if (validationsChecker(req, res)) {
            const ownUser = req.user as IUser;
            if (ownUser && [Role.ADMIN, Role.LECTURER].includes(parseInt(ownUser.role.toString()))) {
                const { enrollId, session, date, time, courseId, facultyId, location } = req.body;
                const enrollDetails: Partial<DEnroll> = {
                    session: session,
                    courseId: courseId,
                    time: time,
                    date: date,
                    facultyId: facultyId,
                    location: location,
                };
                await EnrollDao.updateEnroll(enrollId, enrollDetails, ownUser).then(enroll => {
                    res.sendSuccess(enroll, "Enroll updated successfully!");
                }).catch(next);
            } else {
                ErrorLogger.error(`Update enroll: Illegal attempt`);
                res.sendError(`Illegal attempt!`, 403);
            }
        }
    }

     async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
        if (validationsChecker(req, res)) {
            const ownUser = req.user as IUser;
            if (ownUser && [Role.ADMIN, Role.LECTURER].includes(parseInt(ownUser.role.toString()))) {
                const enrollId = req.params.enrollId as unknown as Types.ObjectId;
                await EnrollDao.deleteEnroll(enrollId as Types.ObjectId, ownUser).then(enroll => {
                    res.sendSuccess(enroll, "Enroll deleted successfully!");
                }).catch(next);
            } else {
                ErrorLogger.error(`Remove enroll: Illegal attempt`);
                res.sendError(`Illegal attempt!`, 403);
            }
        }
    }

}

interface PayloadData {
    event: string;
    data: {
        _id: string;
        user_id: string;
        course_id: string;
        status: string;
    };
}

export default LMSService
