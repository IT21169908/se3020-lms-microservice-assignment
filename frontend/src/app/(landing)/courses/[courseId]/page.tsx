"use client";

import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {currencyConverter} from "@/utils/converters";
import {Course} from "@/models/Course";
import {CourseService} from "@/services/CourseService";
import {motion} from "framer-motion";

const CourseDetails = ({params}: any) => {
    const {data: session} = useSession();
    const router = useRouter();

    const [course, setCourse] = useState<Course | null>(null);

    const handleEnroll = () => {
        if (session) {
            router.push(`/checkout/${course?.id}`);
        } else {
            router.push(`/users/login?destination=/checkout/${course?.id}`);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const courseId = params?.courseId;
            if (!courseId || Array.isArray(courseId)) {
                return {
                    redirect: {destination: "/", permanent: false},
                };
            }

            const course = await CourseService.getSingleCourse(courseId);
            if (!course) {
                return {notFound: true};
            }

            const updatedCourse: Course = {
                ...course,
                updatedAt: course.updatedAt.toString(),
                createdAt: course.createdAt.toString(),
            };
            setCourse(updatedCourse);
        }
        fetchData();
    }, []);


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className='wrapper min-h-screen overflow-hidden'>
            <div className='overflow-hidden'>
                <motion.div
                    style={{backgroundImage: `url(${course?.cover})`}}
                    className='course-cover w-full h-[30rem] object-cover bg-no-repeat bg-cover bg-center'
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 1}}
                />
            </div>

            <div className='course-content mt-10 grid lg:grid-cols-2 lg:gap-10 space-y-2 lg:space-y-0 overflow-hidden'>
                <motion.div
                    className='space-y-2 overflow-hidden'
                    initial={{opacity: 0, y: 50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.5, duration: 1}}
                >
                    <h2 className='text-3xl font-semibold'>{course?.title}</h2>
                    <div className='overflow-hidden'>
                        <p>
                            <span className='font-semibold'>Instructor:</span>{" "}
                            {course?.instructor}
                        </p>
                    </div>
                    <div className='overflow-hidden'>
                        <p>
                            <span className='font-semibold'>Enrolled Students:</span>{" "}
                            {course?.students}
                        </p>
                    </div>
                    <div className='overflow-hidden'>
                        <p>
                            <span className='font-semibold'>Course Description:</span>{" "}
                            {course?.description}
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    className='space-y-2 overflow-hidden'
                    initial={{opacity: 0, y: 50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.8, duration: 1}}
                >
                    <p>
                        <span className='font-semibold'>Course Duration:</span>{" "}
                        {course?.duration}
                    </p>
                    <p>
                        <span className='font-semibold'>Rating:</span> {course?.rating}
                    </p>
                    <p className='text-3xl font-semibold'>
                        Price: {currencyConverter(course?.price)}
                    </p>
                    <button
                        onClick={handleEnroll}
                        className='bg-black text-white py-3 rounded-lg w-full hover:bg-gray-700 duration-300'
                    >
                        Enroll now
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default CourseDetails;

// export const getServerSideProps: GetServerSideProps<Props> = async ({params}) => {
//     const courseId = params?.courseId;
//     if (!courseId || Array.isArray(courseId)) {
//         return {
//             redirect: {destination: "/", permanent: false},
//         };
//     }
//
//     const course = await CourseService.getSingleCourse(courseId);
//     if (!course) {
//         return {notFound: true};
//     }
//
//     const updatedCourse: Course = {
//         ...course,
//         updatedAt: course.updatedAt.toString(),
//         createdAt: course.createdAt.toString(),
//     };
//
//     return {
//       props: {course: updatedCourse}
//     };
// };
