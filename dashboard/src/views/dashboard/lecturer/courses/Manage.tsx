import React, {ReactNode, useEffect, useState} from 'react';
import {Button, Col, Input, message, Popconfirm, Row, Skeleton, Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {PageHeader} from "../../../../components/breadcrumbs/DashboardBreadcrumb";
import {Download, HouseDoor, Pencil, Plus, Search, Trash2} from "react-bootstrap-icons";
import {BorderLessHeading, Main, TopToolBox} from "../../../../components/styled-components/styled-containers";
import {Cards} from "../../../../components/cards/frame/CardFrame";
import {Link} from "react-router-dom";
import {CourseService} from "../../../../services/CourseService";
import {NotFoundWrapper} from "../../layout/style";
import Heading from "../../../../components/heading/Heading";
import JsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import {getCurrentDateTime} from "../../../../utils/date-time";
import Course from "../../../../models/Courses";

interface DataType {
    key: React.Key;
    _id?: string;
    name: ReactNode;
    code: string;
    description: string;
    credits: string;
    fee: string;
    status: string;
    action: ReactNode;
}

const dataTableColumn: ColumnsType<DataType> = [
    //{title: 'Id', dataIndex: '_id', key: '_id'},
    {title: 'Name', dataIndex: 'name', key: 'name'},
    {title: 'Code', dataIndex: 'code', key: 'code'},
    {title: 'Description', dataIndex: 'description', key: 'description'},
    {title: 'Credits', dataIndex: 'credits', key: 'credits'},
    {title: 'Fee', dataIndex: 'fee', key: 'fee'},
    {title: 'Status', dataIndex: 'status', key: 'status'},
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'operation',
        width: 100,
    },
];


const BreadcrumbItem = [
    {
        title: <div className="d-flex align-items-center"><HouseDoor/> &nbsp; Home</div>,
        href: '/lecture',
    },
    {
        title: 'Manage Courses',
    },
];

const ManageCourses: React.FC = () => {

    const [courses, setCourses] = useState<Course[]>([]);
    const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
    const [tableDataSource, setTableDataSource] = useState<DataType[]>([]);
    const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

    const formatDataSource = (courses: Course[]): DataType[] => {
        return courses.map((course) => {
            const {
                _id,
                name,
                code,
                description,
                credits,
                fee,
                status,
            } = course;

            const record: DataType = {
                key: _id,
                // _id: `#${_id}`,
                name: <span className="ninjadash-username">{name}</span>,
                code,
                description,
                credits: `${credits}`,
                fee: `${fee}`,
                status,
                action: (
                    <div className="table-actions">
                        <Link
                            className="btn btn-sm btn-warning text-white me-1"
                            to={`/lecturer/courses/${_id}/edit`}
                        >
                            <Pencil/>
                        </Link>
                        <Popconfirm
                            title="Are You sure you want to delete this courses?"
                            onConfirm={() => deleteSpectacle(_id)}
                            onCancel={() => message.error('Delete canceled!')}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Link className="btn btn-sm btn-danger text-white" to="#">
                                <Trash2/>
                            </Link>
                        </Popconfirm>
                    </div>
                ),
            };
            return record;
        });
    };

    useEffect(() => {
        async function loadCourses() {
            try {
                const res = await CourseService.getAllCourses();
                if (isMounted) {
                    setCourses(res.data);
                    setFilteredCourses(res.data);
                    setIsLoadingData(false);
                }
            } catch (error: any) {
                console.error(error.response.data);
            }
        }

        let isMounted = true;

        loadCourses();
        return () => {
            // TODO unset tableDataSource[]
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        setTableDataSource(formatDataSource(filteredCourses));
    }, [filteredCourses])


    const deleteSpectacle = async (_id: string) => {
        try {
            const res = await CourseService.deleteCourse(_id);
            if (res.success) {
                message.success(`${res.message}`);
                // TODO: REFACTOR this. Do not use filter, when large no of records exist
                const updatedCourses = courses.filter(courses => courses._id !== _id);
                setCourses(updatedCourses);
                setFilteredCourses(updatedCourses);
            }
        } catch (error: any) {
            message.error(`${error.response.data.error || error.response.data.message}`)
            console.log(error.response.data.error)
        }
    }

    const generatePDF = (): void => {
        const doc = new JsPDF();

        // Add a title to the document
        doc.text("Spectacle Report", 14, 20);

        // Create a table
        const tableData = courses.map((s) => [
            s.name,
            s.code,
            s.description,
            s.credits,
            s.fee,
            s.status,
        ]);
        autoTable(doc, {
            head: [['Name', 'code', 'description', 'credits', 'fee', 'status']],
            body: tableData,
        })

        // Save the document
        doc.save(`courses-report-${getCurrentDateTime()}.pdf`);
    };
    console.log("courses --> ", courses);


    const handleSearch = (e: any) => {
        console.log(e.target.value)
        const data = courses.filter((item) => {
            return Object.keys(item).some((key) =>
                item[key].toString().toLowerCase().includes(e.target.value.toLowerCase())
            )
        });
        setFilteredCourses(data);
    };

    if (isLoadingData) {
        return (
            <Row gutter={25} className="justify-content-center">
                <Col md={6} lg={12} xs={24}>
                    <Cards title="Loading..." caption="Loading Skeleton">
                        <Skeleton active paragraph={{rows: 16}}/>
                    </Cards>
                </Col>
            </Row>
        );
    }

    return (<>
            <PageHeader className="ninjadash-page-header-main" title="Manage Courses" routes={BreadcrumbItem}/>
            <Main>
                <Row gutter={15}>
                    <Col xs={24}>
                        <TopToolBox>
                            <Row gutter={0}>
                                <Col xxl={7} lg={12} xs={24}>
                                    <Input suffix={<Search/>} onChange={handleSearch} placeholder="Search this table"/>
                                </Col>
                            </Row>
                        </TopToolBox>
                        <BorderLessHeading>
                            <Cards isbutton={
                                <>
                                    <Button className="btn btn-warning h-auto me-2" onClick={generatePDF}>
                                        <Download className="me-2"/> Export PDF
                                    </Button>
                                    <Link className="btn btn-primary h-auto" type="link" to="/lecturer/courses/create">
                                        <Plus/> Add New
                                    </Link>
                                </>
                            }>
                                {
                                    tableDataSource.length === 0 ? (
                                        <Col md={24}>
                                            <NotFoundWrapper>
                                                <Heading as="h1">No Courses Found</Heading>
                                            </NotFoundWrapper>
                                        </Col>
                                    ) : (
                                        <><Table columns={dataTableColumn} dataSource={tableDataSource}/></>
                                    )
                                }
                            </Cards>
                        </BorderLessHeading>
                    </Col>
                </Row>
            </Main>
        </>
    )
};

export default ManageCourses;
