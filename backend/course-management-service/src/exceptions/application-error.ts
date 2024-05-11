export class ApplicationError extends Error {
    public statusCode: number;

    constructor(msg: string, statusCode: number = 500) {
        super(msg);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, ApplicationError.prototype);
    }
}
