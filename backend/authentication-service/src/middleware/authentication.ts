import {NextFunction, Request, Response} from "express";
import {AppLogger} from "../utils/logging";
import jwt from "jsonwebtoken";
import User from "../schemas/User.schema";
import createHttpError from "http-errors";

export class Authentication {
    public static async verifyToken(req: Request, res: Response, next: NextFunction,) {
        try {
            const signature = req.headers.authorization || "Bearer ";
            const jwt_payload = jwt.verify(signature.split(" ")[1], process.env.JWT_SECRET || "");
            console.log(typeof jwt_payload, jwt_payload)
            if (!jwt_payload || typeof jwt_payload !== 'object') {
                const error = "Unauthenticated user token";
                AppLogger.error(`Login Failed, Err -> ${error}`);
                return next(createHttpError(403, error));
            }
            req.body.user = jwt_payload!._id!;
            const user: any = await User.findById(jwt_payload._id).exec()
            req.user = user;
            AppLogger.info(`User Authenticated User ID: ${jwt_payload}`);
            next();
        } catch (error) {
            AppLogger.error(`Not Authorized`);
            res.sendError('Not Authorized', 403)
        }
    }

    // public static verifyToken(req: Request, res: Response, next: NextFunction) {
    //     AppLogger.error(`Login headers, Info -> ${req.headers.authorization}`);
    //     return passport.authenticate('jwt', {session: false}, (err: any, user: any, info: any) => {
    //         if (err || !user) {
    //             const error = !user ? "Unauthenticated user token" : err;
    //             AppLogger.error(`Login Failed, Info -> ${info}`);
    //             AppLogger.error(`Login Failed, Err -> ${err}`);
    //             return next(createHttpError(403, error));
    //         }
    //         req.user = user;
    //         req.body.user = user._id;
    //         AppLogger.info(`User Authenticated User ID: ${user._id}`);
    //         next();
    //     })(req, res, next);
    // }
}
