"use client";

import {useEffect, useState} from "react";
import {FiChevronUp, FiChevronDown} from "react-icons/fi";
import Image from "next/image";
import {motion} from 'framer-motion';
import type {NextPage} from "next";
import SectionHeader from "@/app/components/sections/SectionHeader";

interface Faq {
    question: string;
    answer: string;
}

const FAQContent: NextPage = () => {

    const defaultFaq = [
        {question: "Do you offer refunds for courses?", answer: "Refunds are available within 30 days of purchase, provided that you have not accessed more than 25% of the course content. Please refer to our refund policy for more information.",},
        {question: "How do I purchase a course?", answer: "To purchase a course, simply browse our course catalog, select the course you want, and click on the \"Buy Now\" button. You will be redirected to the checkout page where you can complete the payment process.",}
    ]

    const [faqs, setFaqs] = useState<Faq[]>([]);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    useEffect(() => {
      const fetchFaqs = async () => {
        // const response = await fetch('/api/faqs');
        // const data = await response.json();
        setFaqs(defaultFaq);
      };

      fetchFaqs();
    }, []);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const variants = {
        visible: {opacity: 1, transition: {duration: 0.5}}, hidden: {opacity: 0},
    };

    return(
        <section className='faqs wrapper py-10 md:py-20 2xl:h-[calc(100vh-6rem)]'>
            <SectionHeader
                heading='Frequently Asked Questions'
                subHeading='FAQ'
                pera='Find answers to common questions about our courses and the purchasing process.'
            />
            <div className='w-full flex gap-10 mt-10'>
                <motion.div
                    className='hidden lg:block w-1/2 rounded-2xl'
                    initial="hidden"
                    animate="visible"
                    variants={variants}
                >
                    <Image
                        src='https://images.pexels.com/photos/5428825/pexels-photo-5428825.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                        alt='Hands on Top of Paper Crafts'
                        width={1910}
                        height={1910}
                        className='w-full h-60 object-cover rounded-2xl'
                    />
                </motion.div>
                <motion.div
                    className='w-full lg:w-1/2'
                    initial="hidden"
                    animate="visible"
                    variants={variants}
                >
                    {faqs?.map((faq, index) => (<div key={index} className='mb-4'>
                            <button
                                className='w-full flex items-center justify-between p-4 rounded-lg bg-white border border-gray-300 mb-2'
                                onClick={() => toggleAccordion(index)}
                            >
                                <span className='font-semibold'>{faq.question}</span>
                                <span>
                  {activeIndex === index ? (<FiChevronUp size={30}/>) : (<FiChevronDown size={30}/>)}
                </span>
                            </button>
                            {activeIndex === index && (<div
                                    className={`px-4 py-2 bg-white border border-gray-400 rounded-b-lg shadow-lg`}
                                >
                                    <p>{faq.answer}</p>
                                </div>)}
                        </div>))}
                </motion.div>
            </div>
        </section>
    );
};

export default FAQContent;
