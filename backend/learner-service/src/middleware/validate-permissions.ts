import {NextFunction, Request, Response} from "express";
import {Permission} from "../enums/auth";
import {ApplicationError} from "../utils/application-error";

// import User = Express.User;

export function verifyPermission(...permissions: Permission[]) {
    return function (req: Request, res: Response, next: NextFunction) {

        const user = req.user;
        if (user) {
            const [success, message] = checkPermission(permissions);
            if (success) {
                next();
            } else {
                throw new ApplicationError(message);
            }
        }
    };
}

export function checkPermission(permissions: Permission[]): [boolean, string] {
    // TODO: consume AUTH_SERVICE Publisher
    return [false, "Unknown user role"];
}
