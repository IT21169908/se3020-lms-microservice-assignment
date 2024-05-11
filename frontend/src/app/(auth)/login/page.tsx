"use client";
import {useState} from 'react';
import {FcUnlock} from 'react-icons/fc';
import {motion} from 'framer-motion';
import {NextPage} from "next";
import SectionHeader from "@/app/components/sections/SectionHeader";
import Link from 'next/link';

const Login: NextPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const loginHandler = () => {
        alert("Please login to continue with our features!")
    };

    return (
        <motion.section
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className='login wrapper pt-10 md:pt-20 pb-5 md:pb-10'
        >
            <SectionHeader
                subHeading='Login'
                heading='Get started'
                pera='Please login to continue with our features!'
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
                    onClick={loginHandler}
                    className='flex items-center justify-center gap-2 bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-700 duration-300 w-1/2 text-center'
                >
                    <span><FcUnlock/></span>{' '}
                    Sign in
                </button>
            </div>
            <div className='flex flex-col items-center mt-10'>
                <div className='mt-4 text-gray-600'>
                    {'Don\'t have an account? '}
                    <Link href='/register' className='text-blue-500 hover:underline'>Register Now</Link>
                </div>
            </div>
        </motion.section>
    );
};

export default Login;
