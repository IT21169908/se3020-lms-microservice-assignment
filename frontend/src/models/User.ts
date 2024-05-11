export interface User {
    name: string;
    email: string;
    password: string;
    phone?: string;
    permissions?: number;
    role?: number;
    lastLoggedIn?: Date;
    signedUpAs? : string;
    isActive? : boolean;
    deactivateReasons? : any;
}
