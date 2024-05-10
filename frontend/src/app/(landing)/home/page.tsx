"use client";

import type {NextPage} from 'next';
import React from "react";
import Welcome from "@/app/(landing)/home/Welcome";
import FAQContent from "@/app/(landing)/faqs/FAQContent";
import AboutContent from "@/app/(landing)/about/AboutContent";

const Home: NextPage = () => {

    return (
        <>
            <Welcome />
            <AboutContent />
            <FAQContent />
        </>
    );
};

export default Home;
