import { NextFunction, Request, Response } from "express";
import { AppLogger } from "../utils/logging";
import passport from "passport";
import createHttpError from "http-errors";

export class Authentication {
    public static verifyToken(req: Request, res: Response, next: NextFunction) {
        AppLogger.error(`Login headers, Info -> ${req.headers.authorization}`);
        return passport.authenticate('jwt', {session: false}, (err: any, user: any, info: any) => {
            if (err || !user) {
                const error = !user ? "Unauthenticated user token" : err;
                AppLogger.error(`Login Failed, Info -> ${info}`);
                AppLogger.error(`Login Failed, Err -> ${err}`);
                return next(createHttpError(403, error));
            }
            req.user = user;
            req.body.user = user._id;
            AppLogger.info(`User Authenticated User ID: ${user._id}`);
            next();
        })(req, res, next);
    }
}
