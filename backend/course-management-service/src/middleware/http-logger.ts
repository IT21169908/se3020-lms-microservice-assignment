import {NextFunction, Request, Response} from 'express';
import {ErrorLogger, RequestLogger, UaLogger} from "../utils/logger";

export function RequestLoggerHandler(req: Request, res: Response, next: any) {
    if (req.method !== "OPTIONS") {
        const user = req.user;
        UaLogger.info(req.headers['user-agent'] + " :: " + req.url);
        res.on('finish', () => {
            const eUser = (user && user._id) ? 'U=' + user._id.toString() : "";
            const resOut = `${eUser.padEnd(6)} ${res.statusCode} ${req.method.padEnd(7)} ${req.url} ${res.statusMessage}`;
            RequestLogger.info(resOut);
        });
    }
    next();
}

export function ResponseHandler(req: Request, res: Response, next: NextFunction) {
    // TODO correct this is not good practice -> (res as any)
    res.sendSuccess = (data: any, message: string | null = null) => {
        res.send({success: true, data: data, message: message});
    };

    res.sendError = (error: any, errorCode = 500) => {
        if (typeof error === 'string') {
            res.status(errorCode).json({success: false, error: error, errorCode: errorCode});
        } else {
            if (!error) {
                error = {stack: null, message: "Unknown Error"};
            }
            ErrorLogger.error(error.stack);
            res.status(errorCode).json({success: false, error: error.message, errorData: error, errorCode: errorCode});
        }
    };
    next();
}