"use client";
import { useState } from 'react';
import { FcLock, FcUnlock } from 'react-icons/fc';
import { motion } from 'framer-motion';
import { NextPage } from "next";
import SectionHeader from "@/app/components/sections/SectionHeader";
import Link from "next/link";

const Register: NextPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const registerHandler = () => {
        alert("Please register to continue with our features!")
    };

    return (
        <motion.section
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className='register wrapper pt-10 md:pt-20 pb-5 md:pb-10'
        >
            <SectionHeader
                subHeading='Register'
                heading='Create an Account'
                pera='Please fill out the following fields to create an account!'
            />
            <div className='flex flex-col items-center mt-10'>
                <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='border border-gray-300 px-4 py-3 rounded-lg mb-4 outline-none duration-300 w-1/2'
                />
                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='border border-gray-300 px-4 py-3 rounded-lg mb-4 outline-none duration-300 w-1/2'
                />
                <input
                    type='password'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className='border border-gray-300 px-4 py-3 rounded-lg mb-4 outline-none duration-300 w-1/2'
                />
                <div className='flex items-center mb-4'>
                    <input
                        type='checkbox'
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className='mr-2'
                    />
                    <label htmlFor='rememberMe' className='text-gray-600'>
                        Remember Me
                    </label>
                </div>
                <button
                    onClick={registerHandler}
                    className='flex items-center justify-center gap-2 bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-700 duration-300 w-1/2 text-center'
                >
                    <span><FcLock/></span>{' '}
                    Register
                </button>
            </div>
            <div className='flex flex-col items-center mt-10'>
                <div className='mt-4 text-gray-600'>
                    {'Already have an account? '}
                    <Link href='/login' className='text-blue-500 hover:underline'>Login Now</Link>
                </div>
            </div>
        </motion.section>
    );
};

export default Register;
