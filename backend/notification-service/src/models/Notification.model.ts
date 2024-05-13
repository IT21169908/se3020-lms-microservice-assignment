import {StringOrObjectId} from "../types/custom-types";

interface NotificationCommonAttributes {
    user_id: StringOrObjectId;
    title: string;
    message: string;
    read: boolean;
    roles?: string[];
}

export interface DNotification extends NotificationCommonAttributes {
    _id?: StringOrObjectId;
}

export interface INotification extends NotificationCommonAttributes {

}
