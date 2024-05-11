import {NextFunction, Request, Response} from "express";

export class Authentication {
    public static verifyToken(req: Request, res: Response, next: NextFunction) {
        // authenticate the request
        next();
    }
}
