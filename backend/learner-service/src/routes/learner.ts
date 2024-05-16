import {Express, Router} from 'express';
import LMSService from "../services/LMSService";

export function LearnerRoutesInit(router: Router, lmsService: LMSService) {

    /* PUBLIC ROUTES ===================================== */
    router.get('/test', lmsService.test);

    /* AUTH ROUTES ===================================== */

    router.post('/enroll', lmsService.enrollmentValidationRules(), lmsService.enrollCourse.bind(lmsService));

    // router.get('/student/enrollments', EnrollmentEp.getAllEnrollmentsForStudent.bind(EnrollmentEp));
    // router.get('/student/enrollments/:enrollmentId', EnrollmentEp.enrollmentValidationRules(), EnrollmentEp.getEnrollment.bind(EnrollmentEp));
    // router.delete('/student/enrollments/:enrollmentId', EnrollmentEp.enrollmentValidationRules(), EnrollmentEp.withdrawFromEnrollment.bind(EnrollmentEp));
    // router.put('/student/enrollments/:enrollmentId/completed', EnrollmentEp.markEnrollmentCompleted.bind(EnrollmentEp));

}
