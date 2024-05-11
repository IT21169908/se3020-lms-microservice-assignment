"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";
import React from "react";

const Footer: React.FC = () => {
  return (
      <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className='bg-black pt-20 text-gray-400'
      >
        <div className='wrapper mx-auto'>
          <div className='overflow-hidden'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-5 items-start w-full pb-10'
            >
              <div className='company-intro col-span-1 lg:col-span-2'>
                <div className='logo mb-4'>
                  <Link href='/' passHref className='text-white font-semibold text-xl'>EasyLearny</Link>
                </div>
                <p className='text-gray-400'>
                  EasyLearny is an innovative learning platform that offers a
                  diverse selection of courses to help you enhance your skills and
                  knowledge. With a wide range of options to explore and easy
                  purchasing capabilities, EasyLearny empowers you to take control
                  of your learning journey and achieve your goals.
                </p>
                <div className='flex mt-5 gap-5'>
                  <Link href='https://www.facebook.com' passHref>
                    <FiFacebook
                        size={24}
                        className='hover:text-white duration-300'
                    />
                  </Link>
                  <Link href='https://www.twitter.com' passHref>
                    <FiTwitter
                        size={24}
                        className='hover:text-white duration-300'
                    />
                  </Link>
                  <Link href='https://www.instagram.com' passHref>
                    <FiInstagram
                        size={24}
                        className='hover:text-white duration-300'
                    />
                  </Link>
                </div>
              </div>

              {/* PAGES */}
              <div className='pages col-span-1 lg:col-span-1'>
                <h4 className='text-xl font-bold mb-4 text-white'>Quick Links</h4>
                <ul className='text-md font-semibold flex flex-col gap-2'>
                  <li>
                    <Link href='/' passHref className='hover:text-white duration-300 hover:underline underline-offset-2'>
                        Home
                    </Link>
                  </li>
                  {/* Add other quick links */}
                </ul>
              </div>
              {/* Add other sections */}
            </motion.div>
          </div>

          {/* COPYRIGHT */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              className='copyright text-md py-10 border-t border-gray-500 text-center text-gray-400 overflow-hidden'
          >
            <p>
              &copy; {new Date().getFullYear()}, EasyLearny. All rights reserved
            </p>
          </motion.div>
        </div>
      </motion.footer>
  );
};

export default Footer;
