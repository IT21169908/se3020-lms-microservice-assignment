import {Express} from 'express';
import * as TimetableEp from "../end-points/Timetable.ep";
import * as EnrollmentEp from "../end-points/Enrollment.ep";

export function StudentRoutesInit(app: Express) {

    /* PUBLIC ROUTES ===================================== */


    /* AUTH ROUTES (Student) ===================================== */
    app.get('/student/timetables', TimetableEp.getAll.bind(TimetableEp));
    app.get('/student/timetables/:timetableId', TimetableEp.timetableValidationRules(), TimetableEp.getTimetable.bind(TimetableEp));

    app.post('/student/enrollments', EnrollmentEp.enrollmentValidationRules(), EnrollmentEp.enrollStudent.bind(EnrollmentEp));
    app.get('/student/enrollments', EnrollmentEp.getAllEnrollmentsForStudent.bind(EnrollmentEp));
    app.get('/student/enrollments/:enrollmentId', EnrollmentEp.enrollmentValidationRules(), EnrollmentEp.getEnrollment.bind(EnrollmentEp));
    app.delete('/student/enrollments/:enrollmentId', EnrollmentEp.enrollmentValidationRules(), EnrollmentEp.withdrawFromEnrollment.bind(EnrollmentEp));
    app.put('/student/enrollments/:enrollmentId/completed', EnrollmentEp.markEnrollmentCompleted.bind(EnrollmentEp));


}
