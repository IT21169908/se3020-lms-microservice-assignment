"use client";

import React, {useEffect} from "react";
import {ChildrenProps} from "@/app/types/Common";

export const NextInitProvider = ({ children }: ChildrenProps) => {

    useEffect(() => {
        // use int calls
    }, []);

    return <>{children}</>;
};
