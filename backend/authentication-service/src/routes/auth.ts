import {Express, NextFunction, Request, Response} from 'express';
import AuthService from "../services/AuthService";
import User from "../schemas/User.schema";

export function AuthRoutesInit(app: Express, authService: AuthService) {

    app.get('/test', authService.tester.bind(authService));

    // app.get('/test', ((req: Request, res: Response, next: NextFunction) => authService.tester(req, res, next, rabbitMQ)));
    // app.get('/test', (req, res) => {
    //     let coursePayload, notifyPayload;
    //     res.json({coursePayload, notifyPayload, message: "AUTH SERVICE TEST ROUTE™ API"});
    // });

    /* PUBLIC ROUTES ===================================== */
    // app.post('/api/public/tester', UserEp.authenticateValidationRules(), UserEp.tester);

    app.post('/login', async (req: Request, res: Response, next: NextFunction) => {
        const user = await User.findOne({email: req.body.email});
        if (user) {
            const isMatch = await user.comparePassword(req.body.password);
            if (!isMatch) {
                res.sendError('Incorrect email/password combination!', 401);
            }

            const token = user.createAccessToken("24 hours");

            res.sendSuccess({token: token, user: user}, "Login Success")
        } else {
            res.sendError('User not found in the system!', 403);
        }

    });
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
