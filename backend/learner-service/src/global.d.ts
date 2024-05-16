import http from "http";
import https from "https";
import {Permission, Role} from "./enums/auth";
type ObjectId = import('mongoose').Types.ObjectId;
type Server = https.Server | http.Server;

declare global {
    namespace Express {
        export interface Request {
            user?: User;
            // admin?: IAdmin;
        }

        export interface Response {
            sendSuccess: (data: unknown, message?: string) => void;
            sendError: (error: unknown, errorCode?: number) => void;
        }

        interface User {
            _id: ObjectId;
            name: string;
            email: string;
            phone?: string;
            signedUpAs?: string;
            readonly role: Role;
            permissions: Permission[];
            lastLoggedIn: Date;
        }

        // interface User extends IUser {
        //     _id: ObjectId;
        // }
    }
}
