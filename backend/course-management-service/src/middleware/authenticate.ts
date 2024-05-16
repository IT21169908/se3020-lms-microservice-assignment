import {NextFunction, Request, Response} from "express";
import {AppLogger} from "../utils/logger";
import passport from "passport";
import createHttpError from "http-errors";

export class Authentication {

    // TODO: this also works fine
    // public static async verifyToken(req: Request, res: Response, next: NextFunction,) {
    //     try {
    //         const signature = req.header("Authorization") || "Bearer ";
    //         const user = jwt.verify(signature.split(" ")[1], process.env.JWT_SECRET);
    //         req.user = user;
    //         req.body.user = user._id;
    //         AppLogger.info(`User Authenticated User ID: ${user._id}`);
    //         next();
    //     } catch (error) {
    //         AppLogger.error(`Not Authorized`);
    //         res.sendError('Not Authorized', 403)
    //     }
    // }

    public static verifyToken(req: Request, res: Response, next: NextFunction) {
        return passport.authenticate('jwt', {session: false}, (err: any, user: any, info: any) => {
            if (err || !user) {
                AppLogger.error(`Login Failed, Reason -> ${info}`);
                throw createHttpError(403, info)
            }
            req.user = user;
            req.body.user = user._id;
            AppLogger.info(`User Authenticated User ID: ${user._id}`);
            next();
        })(req, res, next);
    }
}
