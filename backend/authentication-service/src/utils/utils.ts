import { Types } from "mongoose";

export function isObjectId(v: string): boolean {
    return Types.ObjectId.isValid(v) && new Types.ObjectId(v).toHexString() === v;
}
