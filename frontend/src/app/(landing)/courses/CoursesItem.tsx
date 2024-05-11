import Image from "next/image";
import {AiOutlineStar} from "react-icons/ai";
import {Course} from "@/models/Course";
import React from "react";
import {currencyConverter} from "@/utils/converters";
import LinkButton from "@/app/components/buttons/LinkButton";
import {motion} from "framer-motion";

const CoursesItem: React.FC<{ course: Course }> = ({course}) => {

    return (
        <motion.div
            initial={{opacity: 0, y: 50}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 1}}
            className='course-card w-full lg:w-[30rem] shadow-md rounded-md overflow-hidden'
        >
            <div className='course-image w-full h-[25rem] lg:h-[20rem] overflow-hidden'>
                <Image
                    src={course.cover}
                    alt={course.title}
                    width={640}
                    height={360}
                    priority
                    className='w-full h-full object-cover'
                />
            </div>

            <div className='course-content p-5 space-y-2'>
                <h3 className='course-title text-3xl font-medium'>{course.title}</h3>
                <p className='flex justify-between text-gray-500'>
        <span>
          by{" "}
            <span className='font-semibold text-black'>
            {course.instructor}
          </span>
        </span>
                    <span>
          Duration:{" "}
                        <span className='text-black font-semibold'>{course.duration}</span>
        </span>
                </p>
                <p className='flex justify-between'>
        <span>
          Enrolled students:{" "}
            <span className='text-black font-semibold'>{course.students}</span>
        </span>
                    <span className='flex items-center gap-1 text-black font-semibold'>
          <AiOutlineStar/>
                        {course.rating}
        </span>
                </p>
                <p>{course.description.substring(0, 100)}...</p>

                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.5, duration: 0.5}}
                    className='flex justify-between items-center'
                >
                    <p className='text-lg font-semibold'>
                        {currencyConverter(course.price)}
                    </p>
                    <LinkButton
                        href={`/courses/${course.id}`}
                        placeholder='View details'
                        color='primary'
                        size='default'
                    />
                </motion.div>
            </div>
        </motion.div>
    );

};

export default CoursesItem;
