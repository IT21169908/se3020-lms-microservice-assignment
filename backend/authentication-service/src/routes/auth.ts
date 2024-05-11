import {Express} from 'express';
import AuthService from "../services/AuthService";

export function AuthRoutesInit(app: Express, authService: AuthService) {

    app.get('/test', authService.tester.bind(authService));

    // app.get('/test', ((req: Request, res: Response, next: NextFunction) => authService.tester(req, res, next, rabbitMQ)));
    // app.get('/test', (req, res) => {
    //     let coursePayload, notifyPayload;
    //     res.json({coursePayload, notifyPayload, message: "AUTH SERVICE TEST ROUTE™ API"});
    // });

    /* PUBLIC ROUTES ===================================== */
    // app.post('/api/public/tester', UserEp.authenticateValidationRules(), UserEp.tester);

    // app.post('/api/public/login', UserEp.authenticateValidationRules(), UserEp.loginUser);
    // app.post('/api/public/register', UserEp.registerValidationRules(), UserEp.registerUser);
    // app.post('/api/public/forgot-password', UserEp.forgotPasswordValidationRules(), UserEp.forgotPassword);
    // app.post('/api/public/reset-password', UserEp.resetPasswordValidationRules(), UserEp.resetPassword);
    // app.get('/api/public/token-validate/:token', UserEp.tokenValidationRules(), UserEp.tokenValidate);
    // app.get('/api/public/logout', UserEp.logout);

    /* AUTH ROUTES ===================================== */
    // app.get('/api/auth/me', UserEp.getSelf);
    // app.put('/api/auth/me', UserEp.updateUserValidationRules(true), UserEp.updateSelf);
    // app.delete('/api/auth/me', UserEp.deactivate);

}
