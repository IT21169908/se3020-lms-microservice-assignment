import {Express, NextFunction, Request, Response} from 'express';
import AuthService from "../services/AuthService";
import User from "../schemas/User.schema";

export function AuthRoutesInit(app: Express, authService: AuthService) {

    app.get('/test', authService.tester.bind(authService));

    app.post('/login', authService.loginUser.bind(authService));
    app.post('/register', authService.registerUser.bind(authService));
    // app.post('/forgot-password', authService.forgotPassword.bind(authService));
    // app.post('/reset-password', authService.resetPassword.bind(authService));
    // app.get('/token-validate/:token', authService.tokenValidate.bind(authService));
    // app.get('/logout', authService.logout.bind(authService));

    // /* AUTH ROUTES ===================================== */
    app.get('/me', authService.getSelf.bind(authService));
    app.put('/me', authService.updateSelf.bind(authService));
    app.delete('/me', authService.deactivate.bind(authService));

}
