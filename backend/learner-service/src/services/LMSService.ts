import {RabbitMQService} from "./RrabbitMQService";
import LMSRepository from "../repository/LMSRepository";
import {NextFunction, Request, Response} from "express";
import env from "../config";
import {EnrollmentValidations} from "../middleware/validations/enrollment-validations";
import {validationsChecker} from "../middleware/validations/validation-handler";
import {DEnrollment} from "../models/Enrollment.model";
import {ErrorLogger} from "../utils/logger";

const {AUTH_SERVICE, LMS_SERVICE} = env;

class LMSService {

    private readonly rabbitMQ: RabbitMQService;
    private readonly lmsRepository: LMSRepository;

    constructor(rabbitMQ: RabbitMQService) {
        this.lmsRepository = new LMSRepository()
        this.rabbitMQ = rabbitMQ;
        this.test = this.test.bind(this);
    }

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

    public test(req: Request, res: Response, next: NextFunction) {
        const user = req.user;

        const authPayload = {
            event: "LOGIN",
            data: {
                "_id": user?._id || null,
                "name": user?.name || null,
                "email": user?.email || null,
                "role": user?.role || null,
                "permissions": user?.permissions || null,
                "signedUpAs": user?.signedUpAs || null,
                "phone": user?.phone || null,
                "lastLoggedIn": user?.lastLoggedIn || null,
            }
        }

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
        this.rabbitMQ.publishMessage(AUTH_SERVICE, JSON.stringify(authPayload))
        this.rabbitMQ.publishMessage(LMS_SERVICE, JSON.stringify(lmsPayload))

        res.sendSuccess({authPayload: authPayload, lmsPayload: lmsPayload,}, "LEARNER SERVICE TEST ROUTE™ API");
        // res.json({authPayload: authPayload, lmsPayload: lmsPayload,});
    }

    async enrollCourse(req: Request, res: Response, next: NextFunction): Promise<void> {
        if (validationsChecker(req, res)) {
            const ownUser = req.user;
            if (ownUser) {
                const { learnerId, courseId } = req.body;
                const data: DEnrollment = {
                    learnerId: ownUser._id || learnerId,
                    courseId: courseId,
                    status: "enrolled",
                    enrollmentDate: new Date,
                };
                await this.lmsRepository.enrollLearner(data, ownUser).then(enrollment => {
                    res.sendSuccess(enrollment, "Learner enrolled successfully!");
                }).catch(next);
            } else {
                ErrorLogger.error(`Enroll learner: Illegal attempt`);
                res.sendError(`Illegal attempt!`, 403);
            }
        }
    }

    public enrollmentValidationRules() {
        return [
            // EnrollmentValidations.learnerId(),
            EnrollmentValidations.courseId(),
        ];
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
