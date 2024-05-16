import axios from 'axios';
import Spectacle from "../models/Spectacle";
import {AppResponse, AxiosAppResponse} from '../types/service-types/response';
import {ApiUtils} from "../utils/api-utils";
import Order from "../models/Order";

interface placeOrderType {
    spectacleId: string,
    address: string,
    phone: string,
    email: string,
    paymentMethod: string,
    note: string,
}

export class OrderService {

    private static authToken = JSON.parse(localStorage.getItem('authToken')  ?? "12");

    private static config = {
        headers: {
            'Authorization': 'Bearer ' + this.authToken
        }
    }


    static async placeOrder(data: placeOrderType): Promise<AppResponse<any>> {
        const ep = ApiUtils.studentUrl('orders/place');

        const response = await axios.post<Partial<Spectacle>, AxiosAppResponse<any>>(ep, data, this.config);
        if (response.data.success) {
            return response.data;
        } else {
            throw Error("Request failed with status: " + response.status + " message: " + response.data.error);
        }
    }

    static async updateOrderStatus(_id: string, status: string): Promise<AppResponse<any>> {
        const ep = ApiUtils.adminUrl('orders/' + _id);

        const response = await axios.put<Partial<Spectacle>, AxiosAppResponse<any>>(ep, {status}, this.config);
        if (response.data.success) {
            return response.data;
        } else {
            throw Error("Request failed with status: " + response.status + " message: " + response.data.error);
        }
    }

    static async getAllOrdersByUser(): Promise<AppResponse<Order[]>> {
        const ep = ApiUtils.studentUrl('orders');
        const response = await axios.get<Partial<Order>, AxiosAppResponse<Order[]>>(ep, this.config);
        if (response.data.success) {
            return response.data;
        } else {
            throw Error("Request failed with status: " + response.status + " message: " + response.data.error);
        }
    }

    static async getAllOrders(): Promise<AppResponse<Order[]>> {
        const ep = ApiUtils.adminUrl('orders');
        const response = await axios.get<Partial<Order>, AxiosAppResponse<Order[]>>(ep, this.config);
        if (response.data.success) {
            return response.data;
        } else {
            throw Error("Request failed with status: " + response.status + " message: " + response.data.error);
        }
    }

    static async deleteOrder(_id: string) {
        const endpoint = ApiUtils.studentUrl(`orders/${_id}`);
        const response = await axios.delete(endpoint, this.config);
        if (response.data.success) {
            return response.data;
        } else {
            throw Error("Request failed with status: " + response.status + " message: " + response.data.error);
        }
    }

    static async deleteOrderByAdmin(_id: string) {
        const endpoint = ApiUtils.adminUrl(`orders/${_id}`);
        const response = await axios.delete(endpoint, this.config);
        if (response.data.success) {
            return response.data;
        } else {
            throw Error("Request failed with status: " + response.status + " message: " + response.data.error);
        }
    }

}

