"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import {ChildrenProps} from "@/app/types/Common";

export const NextAuthProvider = ({ children }: ChildrenProps) => {
    return <SessionProvider>{children}</SessionProvider>;
};
