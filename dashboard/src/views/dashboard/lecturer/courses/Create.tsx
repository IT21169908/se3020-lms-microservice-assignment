import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Input, message, Row, Select} from 'antd';
import {FormLayout} from '../../../../components/forms/Form';
import {Main} from '../../../../components/styled-components/styled-containers';
import {PageHeader} from '../../../../components/breadcrumbs/DashboardBreadcrumb';
import {HouseDoor} from "react-bootstrap-icons";
import Course from "../../../../models/Courses";
import {useNavigate, useParams} from "react-router-dom";
import {CourseService} from "../../../../services/CourseService";
import {AntdNotification} from "../../../../components/notifications/Notification";
import {getCurrentDateTime} from "../../../../utils/date-time";

function CourseCreate({enableEdit}: { enableEdit: boolean }) {
    const navigate = useNavigate();
    const {course: course_id} = useParams();
    const [course, setCourse] = useState<Course | null>(null);


    useEffect(() => {
        //if (!enableEdit) {
        setCourse(null);
        //}
    }, [enableEdit]);

    useEffect(() => {
        let isMounted = true;

        async function loadCourse() {
            try {
                const res = await CourseService.getCourseById(course_id);
                if (isMounted) {
                    setCourse(res.data);
                }
            } catch (error: any) {
                console.error(error.response.data.error || error.response.data.message);
                message.error("Loading failed!")
            }
        }

        if (enableEdit) {
            loadCourse();
        }

        return () => {
            isMounted = false;
        };
    }, [enableEdit, course_id]);

    const items = [
        {
            title: <div className="d-flex align-items-center"><HouseDoor/> &nbsp; Home</div>,
            href: '/lecturer',
        },
        {
            title: 'Course Create',
        },
    ];
    console.log("course --> ", course)

    const onFinish = async (values: Course) => {
        console.log('Success:', values);
        if (!enableEdit) {
            try {
                const res = await CourseService.createCourse(values);
                if (res.success) {
                    AntdNotification.success({
                        message: 'Course created successfully!',
                        description: `${res.message} ${getCurrentDateTime()}`,
                        duration: 20
                    });
                    setCourse(null);
                    navigate('/lecturer/courses')
                }
            } catch (error: any) {
                console.error(error.response.data.error || error.response.data.message);
                AntdNotification.error({
                    message: 'Courses loading failed!',
                    description: `${error.response.data.error || error.response.data.message} -- ${getCurrentDateTime()}`,
                    duration: 20
                });
            }
        } else {
            if (course_id) {
                try {
                    const res = await CourseService.updateCourse(course_id, values);
                    if (res.success) {
                        AntdNotification.success({
                            message: 'Course updated successfully!',
                            description: `${res.message} ${getCurrentDateTime()}`,
                            duration: 20
                        });
                        setCourse(res.data);
                    }
                } catch (error: any) {
                    AntdNotification.error({
                        message: 'Course creating failed!',
                        description: `${error.response.data.error || error.response.data.message} -- ${getCurrentDateTime()}`,
                        duration: 20
                    });
                    console.log(error.response.data.error)
                }
            } else {
                message.error("Something went wrong!")
            }
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        message.error("Something went wrong!")
        console.log('Failed:', errorInfo);
    };

    if (course_id && !course) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <PageHeader className="ninjadash-page-header-main" title="Add Course" routes={items}/>
            <Main>
                <Row gutter={25}>
                    <Col lg={12} xs={24}>
                        <FormLayout title="Enter Course Information" initialValues={course} onSubmit={onFinish}
                                    onFinishFailed={onFinishFailed}>
                            <Form.Item className="mb-2" name="name" label="Name"
                                       rules={[{required: true, message: 'Please input name!'}]}>
                                <Input/>
                            </Form.Item>

                            <Form.Item className="mb-2" name="code" label="Subject Code"
                                       rules={[{required: true, message: 'Please input subject code!'}]}>
                                <Input/>
                            </Form.Item>

                            <Form.Item className="mb-2" name="description" label="description"
                                       rules={[{required: true, message: 'Please input description!'}]}>
                                <Input/>
                            </Form.Item>

                            <Form.Item className="mb-2" name="credits" label="Credit"
                                       rules={[{required: true, message: 'Please input credit!'}]}>
                                <Input/>
                            </Form.Item>

                            <Form.Item className="mb-2" name="fee" label="Course Fee"
                                       rules={[
                                           {required: true, message: 'Please input Course Fee!'},
                                           {
                                               pattern: /^(\d+(\.\d{1,2})?)?$/,
                                               message: 'Please input a valid Course Fee!'
                                           }
                                       ]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item className="mb-2" name="status" label="Status"
                                       rules={[{required: true, message: 'Please input Status!'}]}>
                                <Select>
                                    <Select.Option value="active">Active</Select.Option>
                                    <Select.Option value="inactive">Inactive</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item className="ninjadash-form-action mt-4">
                                <Button className="btn-signin" type="primary" htmlType="submit" size="large">
                                    Save
                                </Button>
                            </Form.Item>
                        </FormLayout>
                    </Col>
                </Row>
            </Main>
        </>
    );
}

export default CourseCreate;
