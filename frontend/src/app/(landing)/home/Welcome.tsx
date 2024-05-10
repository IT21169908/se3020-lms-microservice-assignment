"use client";

import type {NextPage} from 'next';
import {motion} from "framer-motion";
import Button from "@/app/components/buttons/Button";
import {BsFillCheckCircleFill} from "react-icons/bs";
import Image from "next/image";
import React from "react";

const Welcome: NextPage = () => {

    const imageVariants = {
        hidden: {opacity: 0, x: -100},
        visible: {
            opacity: 1,
            x: 0,
            transition: {type: 'spring', stiffness: 50, duration: 1.0}
        }
    };

    const containerVariants = {
        hidden: {opacity: 0, x: -50},
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring',
                duration: 1.0,
                delay: 0.3
            }
        }
    };

    return (
        <>
            <section
                className='welcome wrapper py-10 md:py-20 sm:h-auto'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
                    <div className='hero-left row-start-2 lg:row-start-auto overflow-hidden'>
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                        >
                            <span className='font-semibold text-gray-500 tracking-wider'>
                                Join Now
                            </span>
                            <h1 className='text-4xl text-gray-900 font-bold lg:text-5xl mt-1'>
                                Break boundaries with online learning access knowledge anywhere easily.
                            </h1>
                            <p className='text-lg text-gray-700 mt-5 mb-10'>
                                Unlock your potential with our online courses. Learn, grow, and
                                explore from anywhere. Discover endless possibilities for personal
                                and professional development. Join us now!
                            </p>
                            <Button
                                color={"main"}
                                placeholder={"Get Started"}
                                href='/courses'
                                size={"default"}
                            />
                            <div className='flex flex-row flex-wrap gap-3 mt-5'>
                                <div className='flex flex-row gap-1 items-center'>
                                    <BsFillCheckCircleFill/>
                                    <h5 className='font-semibold'>Experienced mentor</h5>
                                </div>
                                <div className='flex flex-row gap-1 items-center'>
                                    <BsFillCheckCircleFill/>
                                    <h5 className='font-semibold'>Quality videos</h5>
                                </div>
                                <div className='flex flex-row gap-1 items-center'>
                                    <BsFillCheckCircleFill/>
                                    <h5 className='font-semibold'>Affordable prices</h5>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                    <div className='hero-right row-start-1 lg:row-start-auto overflow-hidden'>
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={imageVariants}
                        >
                            <Image
                                src='https://img.freepik.com/free-photo/pleased-smart-girl-with-elegant-curly-hairstyle-enjoying-photoshoot-with-laptop_197531-6697.jpg?t=st=1715324160~exp=1715327760~hmac=1335dc504c9d48fa2b31c36f38a26fb7439d7767c181d13b9c8d064857000ab1&w=1380'
                                alt='young-woman-holding-laptop-sitting-floor-beige-wall'
                                width={1280}
                                height={620}
                                className='w-full h-full object-cover border-t-[1rem] border-l-[0.7rem] rounded-t-[35%] rounded-b-[50%] border-t-gray-500 border-l-gray-500'
                                priority
                            />
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Welcome;
