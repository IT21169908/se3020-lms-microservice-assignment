import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'antd';
import { Main } from '../../../../components/styled-components/styled-containers';
import { PageHeader } from '../../../../components/breadcrumbs/DashboardBreadcrumb';
import { HouseDoor } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import Course from "../../../../models/Courses";
import { CourseService } from "../../../../services/CourseService";
import { AntdNotification } from "../../../../components/notifications/Notification";
import { getCurrentDateTime } from "../../../../utils/date-time";

function CourseList() {
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        async function fetchCourses() {
            try {
                const res = await CourseService.getAllCourses();
                setCourses(res.data);
                console.log(res.data);
            } catch (error: any) {
                console.error(error.response.data.error || error.response.data.message);
                AntdNotification.error({
                    message: 'Failed to fetch courses',
                    description: `${error.response.data.error || error.response.data.message} -- ${getCurrentDateTime()}`,
                    duration: 20
                });
            }
        }

        fetchCourses();
    }, []);

    const items = [
        {
            title: <div className="d-flex align-items-center"><HouseDoor /> &nbsp; Home</div>,
            href: '/lecturer',
        },
        {
            title: 'Course List',
        },
    ];

    return (
        <>
            <PageHeader className="ninjadash-page-header-main" title="Course List" routes={items}/>
            <Main>
                <Row gutter={25}>
                    {courses.map(course => (
                        <Col key={course.id} lg={12} xs={24}>
                            <div>
                                <h2>{course.name}</h2>
                                <p>{course.description}</p>
                                <Link to={`/lecturer/courses/${course.id}`}>
                                    <Button type="primary">View Details</Button>
                                </Link>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Main>
        </>
    );
}

export default CourseList;
