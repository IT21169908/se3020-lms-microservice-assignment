"use client";

import type {NextPage} from "next";
import {motion} from "framer-motion";
import Image from "next/image";
import React from "react";
import SectionHeader from "@/app/components/sections/SectionHeader";

const AboutContent: NextPage = () => {

    const variants = {
        fadeInRight: {
            initial: {x: 50, opacity: 0}, animate: {
                x: 0, opacity: 1, transition: {delay: 0.7, duration: 1}
            }
        }, fadeInLeft: {
            initial: {x: -50, opacity: 0}, animate: {
                x: 0, opacity: 1, transition: {delay: 0.7, duration: 1}
            }
        }
    };

    return (
        <section className='about wrapper py-5 2xl:h-[calc(100vh-6rem)]'>
            <SectionHeader
                subHeading='About'
                heading='Empowering Learning Through Online Courses'
                pera='Discover the story behind our mission to empower learners worldwide through high-quality online courses.'
            />

            <div className='flex flex-col-reverse lg:flex-row gap-10 mt-10'>
                <motion.div
                    className='w-full lg:w-1/2 space-y-2 overflow-hidden'
                    initial="initial"
                    animate="animate"
                    variants={variants.fadeInRight}
                >
                    <p className='text-lg'>
                        We are a passionate community of educators, learners, and innovators dedicated to transforming
                        knowledge sharing and acquisition. With a focus on quality, accessibility, and user experience,
                        we provide a seamless learning environment for individuals to discover, explore, and master new
                        skills.
                    </p>
                    <p className='text-lg'>
                        Our team of expert instructors curates and designs courses that are not only informative but
                        also engaging and practical. Whether you&apos;re a beginner or an advanced learner, our diverse
                        range of courses caters to different interests and learning styles, ensuring there&apos;s
                        something for everyone.
                    </p>
                    <p className='text-lg'>
                        We believe in the transformative power of education. Through interactive lessons, real-world
                        projects, and personalized feedback, we empower learners to apply their knowledge and develop
                        tangible skills. Join our inclusive community to connect, collaborate, and grow together on a
                        journey of continuous learning.
                    </p>
                </motion.div>

                <motion.div
                    className='w-full lg:w-1/2 overflow-hidden flex justify-center'
                    initial="initial"
                    animate="animate"
                    variants={variants.fadeInLeft}
                >
                    <Image
                        src='https://res.cloudinary.com/drgxflcsb/image/upload/v1684686852/learnify/about-image_i1hnxg.png'
                        alt='A girl stands with a book and thinks about education'
                        width={500}
                        height={500}
                        className='w-[80%]'
                        priority
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default AboutContent;
