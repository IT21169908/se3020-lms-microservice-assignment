"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import {ChildrenProps} from "@/types/Common";

export const NextAuthProvider = ({ children }: ChildrenProps) => {
    return <SessionProvider>{children}</SessionProvider>;
};
