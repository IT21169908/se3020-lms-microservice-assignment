import React, { useEffect, useState } from 'react';
import {Button} from 'antd';
import {PageHeader} from "../../../../components/breadcrumbs/DashboardBreadcrumb";
import {Main} from "../../../../components/styled-components/styled-containers";
import {HouseDoor} from "react-bootstrap-icons";

const Enroll = ({ params }: any) => {

    const [course, setCourse] = useState<any | null>(null);

    const handleEnroll = () => {

    };

    useEffect(() => {
        // const fetchData = async () => {
        //     const courseId = params?.courseId;
        //     if (!courseId || Array.isArray(courseId)) {
        //         // router.push("/");
        //         return;
        //     }
        //
        //     try {
        //         const course = await CourseService.getSingleCourse(courseId);
        //         if (!course) {
        //             // router.push("/");
        //             return;
        //         }
        //
        //         const updatedCourse: Course = {
        //             ...course,
        //             updatedAt: course.updatedAt.toString(),
        //             createdAt: course.createdAt.toString(),
        //         };
        //         setCourse(updatedCourse);
        //     } catch (error: any) {
        //         console.error(error);
        //         router.push("/");
        //     }
        // };
        // fetchData();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const items = [
        {
            title: <div className="d-flex align-items-center"><HouseDoor /> &nbsp; Home</div>,
            href: '/lecturer',
        },
        {
            title: 'Course Enroll',
        },
    ];

    return (
        <>
            <PageHeader className="ninjadash-page-header-main" title="Course Enroll" routes={items}/>
            <Main>
                <section className='wrapper min-h-screen overflow-hidden'>
                    <div className='overflow-hidden'>
                        <div
                            style={{backgroundImage: `url(${course?.cover})`}}
                            className='course-cover w-full h-[30rem] object-cover bg-no-repeat bg-cover bg-center'
                        />
                    </div>

                    <div
                        className='course-content mt-10 grid lg:grid-cols-2 lg:gap-10 space-y-2 lg:space-y-0 overflow-hidden'>
                        <div className='space-y-2 overflow-hidden'>
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
                        </div>

                        <div className='space-y-2 overflow-hidden'>
                            <p>
                                <span className='font-semibold'>Course Duration:</span>{" "}
                                {course?.duration}
                            </p>
                            <p>
                                <span className='font-semibold'>Rating:</span> {course?.rating}
                            </p>
                            <p className='text-3xl font-semibold'>
                                Price: {course?.price}
                            </p>
                            <button
                                onClick={handleEnroll}
                                className='bg-black text-white py-3'
                            >
                                Enroll now
                            </button>
                        </div>
                    </div>
                </section>
            </Main>
        </>
    );
};

export default Enroll;
