import {Router} from 'express';
import CourseService from "../services/CourseService";

export function CourseRoutesInit(router: Router, courseService: CourseService) {

    /* AUTH ROUTES (Admin) ===================================== */
    router.get('/admin/courses', courseService.getAll.bind(courseService));
    router.get('/admin/:_lecture/courses', courseService.getCoursesByLecturerId.bind(courseService));

    // AUTH ROUTES LECTURER
    router.get('/lecturer/courses', courseService.getMyCourses.bind(courseService));
    router.get('/lecturer/courses/:_id', courseService.fetchCourseValidationRules(), courseService.getById.bind(courseService));

    router.post('/lecturer/courses', courseService.createCourseValidationRules(), courseService.create.bind(courseService));
    router.put('/lecturer/courses/:_id', courseService.updateCourseValidationRules(), courseService.update.bind(courseService));
    router.delete('/lecturer/courses/:_id', courseService.fetchCourseValidationRules(), courseService.deleteCourse.bind(courseService));

}
