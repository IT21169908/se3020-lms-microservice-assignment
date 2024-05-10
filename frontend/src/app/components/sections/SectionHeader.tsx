"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {SectionHeaderProps} from "@/app/types/Common";

const SectionHeader: React.FC<SectionHeaderProps> = ({ subHeading, heading, pera }) => {

    const variants = {
        hidden: { y: -20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', duration: 1, delay: 0.3 }
        },
        hiddenUp: { y: 20, opacity: 0 },
        visibleUp: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', duration: 1, delay: 0.6 }
        }
    };

    return (
        <div className='flex flex-col items-center text-center gap-1'>
            <motion.div className='overflow-hidden' initial="hidden" animate="visible" variants={variants}>
                <motion.p className='uppercase text-sm font-bold tracking-widest'>
                    {subHeading}
                </motion.p>
            </motion.div>
            <motion.div className='overflow-hidden' initial="hidden" animate="visible" variants={variants}>
                <motion.h2 className='text-3xl'>
                    {heading}
                </motion.h2>
            </motion.div>
            <motion.div className='overflow-hidden w-3/5' initial="hiddenUp" animate="visibleUp" variants={variants}>
                <motion.p className='text-center text-gray-500'>
                    {pera}
                </motion.p>
            </motion.div>
        </div>
    );
};

export default SectionHeader;
