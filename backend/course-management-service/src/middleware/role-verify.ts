import {NextFunction, Request, Response} from "express";
import {Role} from "../enums/auth";

export function verifyRole(roles: Role[]) {
    return function (req: Request, res: Response, next: NextFunction) {
        // TODO: consume AUTH_SERVICE Publisher
        next();
    };
}
