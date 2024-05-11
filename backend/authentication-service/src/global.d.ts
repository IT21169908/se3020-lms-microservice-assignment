import http from "http";
import https from "https";

type ObjectId = import('mongoose').Types.ObjectId;
type Server = https.Server | http.Server;

declare global {
    namespace Express {
        export interface Request {
            user?: User;
        }

        export interface Response {
            sendSuccess: (data: unknown, message?: string) => void;
            sendError: (error: unknown, errorCode?: number) => void;
        }

        interface User extends IUser {
            _id: ObjectId;
        }
    }
}
