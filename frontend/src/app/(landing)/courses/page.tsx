"use client";

import {useEffect, useState} from "react";
import SectionHeader from "@/app/components/sections/SectionHeader";
import type {NextPage} from "next";
import {Course} from "@/models/Course";
import CoursesItem from "./CoursesItem";
import {CourseService} from "@/services/CourseService";

const Courses: NextPage = () => {

    const [coursesData, setCoursesData] = useState<Course[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const courses = await CourseService.getAllCourses();
            setCoursesData(courses);
        }
        fetchData();
    }, []);

    return (
        <section className='courses wrapper py-5'>
            <SectionHeader
                subHeading='Courses'
                heading='Explore the World of Online Learning'
                pera="Browse all courses and find the perfect one for you. Whether you want to learn a new skill, advance your career, or simply expand your knowledge, there's an online course for you."
            />

            <div className='courses-wrapper flex flex-wrap gap-10 mt-10 justify-center'>
                {coursesData.map((course) => (
                    <CoursesItem key={course.id} course={course}/>
                ))}
            </div>
        </section>
    );
};

export default Courses;


// export const getServerSideProps = async () => {
//     const courses = await CourseService.getAllCourses();
//
//     const updatedCourses = courses.map((course) => ({
//         ...course,
//         updatedAt: course.updatedAt.toString(),
//         createdAt: course.createdAt.toString(),
//     }));
//
//     return {
//         props: {
//             courses: updatedCourses,
//         },
//     };
// };
