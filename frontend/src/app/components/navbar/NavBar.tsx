"use client";
import {useSession} from "next-auth/react";
import {useCallback, useState, useEffect} from "react";
import {FiMenu} from "react-icons/fi";
import {AiOutlineClose} from "react-icons/ai";
import Link from "next/link";
import Button from "@/app/components/buttons/Button";
import { motion } from 'framer-motion';
import {NavbarProps} from "@/app/types/Common";

const Navbar = (props: NavbarProps) => {
    const {data: session} = useSession();

    const [toggleOpen, setToggleOpen] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>('');

    const handleToggle = useCallback(() => {
        if (window.innerWidth > 1023) {
            return;
        }
        setToggleOpen(!toggleOpen);
        document.body.classList.toggle("overflow-hidden");
    }, [toggleOpen]);

    useEffect(() => {
        const name = session ? session.user?.name?.split(" ", 1)[0] : ''
        setUserName(name ?? '');
    }, [session]);

    const headerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", duration: 0.5, delay: 0.5 } }
    };

    const linkFadeIn = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { delay: 1, duration: 0.5 } }
    };

    const menuToggle = {
        closed: { rotate: 0 },
        open: { rotate: 90 }
    };

    return (
        <motion.header
            initial="hidden"
            animate="visible"
            variants={headerVariants}
            className='navbar w-full bg-indigo-500 text-white h-20 flex items-center z-10 relative'
        >
            <div className='wrapper flex justify-between items-center overflow-hidden'>
                <div className='overflow-hidden'>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={linkFadeIn}
                        className='logo'
                    >
                        <Link href='/' className='text-white font-semibold text-xl'>
                            EasyLearny
                        </Link>
                    </motion.div>
                </div>
                <motion.nav
                    className='nav-links relative'
                    onClick={handleToggle}
                    initial="hidden"
                    animate="visible"
                    variants={linkFadeIn}
                >
                    <ul className={`${toggleOpen ? "mobile-nav" : "hidden lg:flex gap-5"}`}>
                        <li><Link href='/' className='hover:text-indigo-950 transition-colors'>Home</Link></li>
                        <li><Link href='/courses' className='hover:text-indigo-950 transition-colors'>Courses</Link></li>
                        {session && (<li>
                            <Link href='/orders' className='hover:text-indigo-950 transition-colors'>Orders</Link>
                        </li>)}
                        <li><Link href='/about' className='hover:text-indigo-950 transition-colors'>About</Link></li>
                        <li><Link href='/testimonials' className='hover:text-indigo-950 transition-colors'>Testimonials</Link></li>
                        <li><Link href='/faqs' className='hover:text-indigo-950 transition-colors'>Faqs</Link></li>
                        <li><Link href='/contact' className='hover:text-indigo-950 transition-colors'>Contact</Link></li>
                    </ul>
                </motion.nav>
                <div className='flex gap-5 items-center overflow-hidden'>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={linkFadeIn}
                    >
                        {!session ? (
                            <Button
                                href='/users/login'
                                placeholder='Sign in'
                                color='primary'
                                size='default'
                            />
                        ) : (
                            <Button
                                href='/users/profile'
                                placeholder={userName}
                                color='secondary'
                                size='default'
                            />
                        )}
                    </motion.div>
                    <motion.span
                        animate={toggleOpen ? "open" : "closed"}
                        variants={menuToggle}
                        className='z-[999] text-2xl lg:hidden'
                        onClick={handleToggle}
                    >
                        {toggleOpen ? <AiOutlineClose/> : <FiMenu/>}
                    </motion.span>
                </div>
            </div>
        </motion.header>
    );
};

export default Navbar;
