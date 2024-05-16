import {NextFunction, Request, Response} from "express";
import {RabbitMQService} from "./RrabbitMQService";

import env from "../config";
import Course from "../repository/CourseRepository";
import {CourseValidations} from "../validations/course-validations";
import {validationsChecker} from "../validations/validation-handler";
import {DCourse} from "../models/CourseModel";
import {Types} from "mongoose";

const {AUTH_SERVICE, LMS_SERVICE} = env

class CourseService {

    private readonly rabbitMQ: RabbitMQService;
    private readonly courseRepository: Course;

    constructor(rabbitMQ: RabbitMQService) {
        this.rabbitMQ = rabbitMQ;
        this.courseRepository = new Course()
        this.test = this.test.bind(this);
    }

    public test(req: Request, res: Response, next: NextFunction) {
        const user = req.user

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


        res.sendSuccess({authPayload: authPayload, lmsPayload: lmsPayload,}, "COURSE SERVICE TEST ROUTE™ API");
    }

    public createCourseValidationRules() {
        return [
            CourseValidations.name(),
            CourseValidations.code(),
            CourseValidations.description(),
            CourseValidations.credits(),
            CourseValidations.fee(),
            // CourseValidations.lecturerId(),
        ];
    }

    public updateCourseValidationRules() {
        return this.createCourseValidationRules();
    }

    public fetchCourseValidationRules() {
        return [];
    }

// ================ CREATE - C ================
    public create(req: Request, res: Response, next: NextFunction) {
        if (validationsChecker(req, res)) {
            const user = req.user;

            const {name, code, fee, description, credits, status} = req.body;
            const data: DCourse = {
                status: status,
                name: name,
                code: code,
                fee: fee,
                description: description,
                credits: credits,
                lecture_id: user?._id!
            };
            this.courseRepository.createCourse(data, user).then(course => {
                res.sendSuccess(course, "Course created successfully!");
            }).catch(next);
        }
    }

// ================ READ - R ================
    public getAll(req: Request, res: Response, next: NextFunction) {
        const user = req.user;
        this.courseRepository.getAllCourses(user).then(courses => {
            res.sendSuccess(courses, "Get all courses successfully!");
        }).catch(next);
    }

    public getCoursesByLecturerId(req: Request, res: Response, next: NextFunction) {
        const user = req.user;
        const lecturerId = req.params._lecture as unknown as Types.ObjectId;
        this.courseRepository.getCoursesByLecturerId(lecturerId).then(courses => {
            res.sendSuccess(courses, "Get all courses successfully!");
        }).catch(next);
    }

    public getMyCourses(req: Request, res: Response, next: NextFunction) {
        const user = req.user;
        this.courseRepository.getCoursesByLecturerId(user?._id!).then(courses => {
            res.sendSuccess(courses, "Get all courses successfully!");
        }).catch(next);
    }

    public getById(req: Request, res: Response, next: NextFunction) {
        if (validationsChecker(req, res)) {
            const user = req.user;
            const courseId = req.params._id as unknown as Types.ObjectId;
            this.courseRepository.getCourseById(courseId, user).then(course => {
                res.sendSuccess(course, "Get course by ID successfully!");
            }).catch(next);
        }
    }

// ================ UPDATE - U ================
    public async update(req: Request, res: Response, next: NextFunction) {
        if (validationsChecker(req, res)) {
            const user = req.user;
            const courseId = req.params._id as unknown as Types.ObjectId;
            const {name, code, description, fee, credits, lecture_id} = req.body;
            const courseDetails: Partial<DCourse> = {
                name: name,
                code: code,
                fee: fee,
                description: description,
                credits: credits,
                lecture_id: lecture_id,
            };
            this.courseRepository.updateCourse(courseId, courseDetails, user).then(course => {
                res.sendSuccess(course, "Course updated successfully!");
            }).catch(next);
        }
    }

// ================ DELETE - D ================
    public deleteCourse(req: Request, res: Response, next: NextFunction) {
        if (validationsChecker(req, res)) {
            const courseId = req.params._id as unknown as Types.ObjectId;
            const user = req.user;
            this.courseRepository.deleteCourseById(courseId, user).then(course => {
                res.sendSuccess(course, "Course deleted successfully!");
            }).catch(next);
        }
    }

    async SubscribeEvents(payload: string): Promise<void> {
        console.log('Triggering.... CoursesService Events');

        const parsedPayload: PayloadData = JSON.parse(payload);

        const {event, data} = parsedPayload;
        const {id, name, price, isActive} = data;

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
        console.log(`CourseService sample SubscribeEvents parsedPayload: `, parsedPayload);
    }
}

interface PayloadData {
    event: string;
    data: {
        id: string;
        name: string;
        price: string;
        isActive: boolean;
    };
}

export default CourseService