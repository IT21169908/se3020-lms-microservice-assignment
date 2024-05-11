import {Express} from 'express';
import CourseService from "../services/CourseService";

export function CourseRoutesInit(app: Express, CourseController: CourseService) {

    /* AUTH ROUTES (Admin) ===================================== */
    // app.get('/api/admin/courses', CourseController.getAll);
    // app.get('/api/admin/courses/:_id', CourseController.fetchCourseValidationRules(), CourseController.getById);
    //
    // app.post('/api/admin/courses', CourseController.createCourseValidationRules(), CourseController.create);
    // app.put('/api/admin/courses/:_id', CourseController.updateCourseValidationRules(), CourseController.update);
    // app.delete('/api/admin/courses/:_id', CourseController.fetchCourseValidationRules(), CourseController.deleteCourse);
}
