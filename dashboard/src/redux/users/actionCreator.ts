import {createAsyncThunk} from "@reduxjs/toolkit";
import IUser from "../../models/User";
import {ApiUtils} from "../../utils/api-utils";

export const getUser = createAsyncThunk<IUser, { user_id: string, signal: AbortSignal }>(
    'fetch/user',
    async ({user_id, signal}) => {
        // TODO: Move into Service
        console.log("createAsyncThunk.getUser")
        const response = await fetch(ApiUtils.publicUrl(`users/${user_id}`), {
            method: "GET",
            signal,
        });
        const data: IUser = await response.json();
        return data;
    });

