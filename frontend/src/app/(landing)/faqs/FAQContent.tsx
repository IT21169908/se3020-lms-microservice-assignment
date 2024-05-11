"use client";

import {useEffect, useState} from "react";
import {FiChevronUp, FiChevronDown} from "react-icons/fi";
import Image from "next/image";
import {motion} from 'framer-motion';
import type {NextPage} from "next";
import SectionHeader from "@/app/components/sections/SectionHeader";

interface Faq {
    id: string;
    question: string;
    answer: string;
}

const FAQContent: NextPage = () => {

    const defaultFaq = [
        {
            "id": "64b6dc59d2cdaf7706415306",
            "question": "Do you offer refunds for courses?",
            "answer": "Refunds are available within 30 days of purchase, provided that you have not accessed more than 25% of the course content. Please refer to our refund policy for more information."
        },
        {
            "id": "64b6dc5ad2cdaf770641530b",
            "question": "How can I contact customer support?",
            "answer": "If you have any questions or need assistance, you can reach our customer support team by emailing support@learnify.com or by using the contact form on our website. We strive to respond to all inquiries within 24 hours."
        },
        {
            "id": "64b6dc5ad2cdaf7706415308",
            "question": "Can I share my course account with others?",
            "answer": "No, sharing your course account with others is strictly prohibited. Each course purchase grants access to a single user only. Violation of this policy may result in account suspension."
        },
        {
            "id": "64b6dc59d2cdaf7706415305",
            "question": "Can I access the course materials immediately after purchase?",
            "answer": "Yes, once your payment is successfully processed, you will gain immediate access to the course materials. You can start learning right away!"
        },
        {
            "id": "64b6dc5ad2cdaf7706415307",
            "question": "How long do I have access to the course materials?",
            "answer": "Once you purchase a course, you will have lifetime access to the course materials. You can revisit the content at any time and learn at your own pace."
        },
        {
            "id": "64b6dc58d2cdaf7706415304",
            "question": "How do I purchase a course?",
            "answer": "To purchase a course, simply browse our course catalog, select the course you want, and click on the \"Buy Now\" button. You will be redirected to the checkout page where you can complete the payment process."
        },
        {
            "id": "64b6dc5ad2cdaf7706415309",
            "question": "Are there any prerequisites for the courses?",
            "answer": "Prerequisites vary depending on the course. Some courses may require prior knowledge or experience in a specific subject. Please check the course description for detailed information about prerequisites."
        },
        {
            "id": "64b6dc5ad2cdaf770641530a",
            "question": "Are the courses accredited or certified?",
            "answer": "Our courses are designed to provide high-quality education and valuable skills. However, they may not be accredited or certified by external educational institutions. Please refer to the course details for specific accreditation or certification information, if applicable."
        },
        {
            "id": "64b6dc5ad2cdaf770641530c",
            "question": "Can I upgrade to a different course package?",
            "answer": "Yes, depending on the course, you may have the option to upgrade to a higher-level package. Please contact our customer support team for more information and assistance with upgrading your course package."
        },
        {
            "id": "64b6dc5bd2cdaf770641530d",
            "question": "What payment methods do you accept?",
            "answer": "We accept major credit cards, including Visa, Mastercard, and American Express. We also support payments through popular online payment platforms such as PayPal and Stripe."
        }
    ];

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
        <section className='faqs wrapper'>
            <SectionHeader
                heading='Frequently Asked Questions'
                subHeading='FAQ'
                pera='Find answers to common questions about our courses and the purchasing process.'
            />
            <div className='w-full flex gap-10 mt-10 mb-32'>
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
