import React, {ReactNode, useEffect, useState} from 'react';
import {Button, Col, Input, Row, Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {PageHeader} from "../../../../components/breadcrumbs/DashboardBreadcrumb";
import {Download, HouseDoor, Search} from "react-bootstrap-icons";
import {BorderLessHeading, Main, TopToolBox} from "../../../../components/styled-components/styled-containers";
import {Cards} from "../../../../components/cards/frame/CardFrame";
import {NotFoundWrapper} from "../../layout/style";
import Heading from "../../../../components/heading/Heading";
import JsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import {getCurrentDateTime} from "../../../../utils/date-time";
import Enrollment from "../../../../models/Enrollment";
import {CourseService} from "../../../../services/CourseService";

interface DataType {
    key?: React.Key;
    _id?: string;
    courseId: string;
    createdAt: string;
    enrollmentDate?: string;
    learnerId: string;
    status?: string;
    action: ReactNode;
}

const dataTableColumn: ColumnsType<DataType> = [
    //{title: 'Id', dataIndex: '_id', key: '_id'},
    {title: '_id', dataIndex: '_id', key: '_id'},
    {title: 'courseId', dataIndex: 'courseId', key: 'courseId'},
    {title: 'createdAt', dataIndex: 'createdAt', key: 'createdAt'},
    {title: 'enrollmentDate', dataIndex: 'enrollmentDate', key: 'enrollmentDate'},
    {title: 'learnerId', dataIndex: 'learnerId', key: 'learnerId'},
    {title: 'status', dataIndex: 'status', key: 'status'},
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
        href: '/lecturer',
    },
    {
        title: 'Manage Enrollments',
    },
];

const ManageUsers: React.FC = () => {

    const [users, setUsers] = useState<Enrollment[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<Enrollment[]>([]);
    const [tableDataSource, setTableDataSource] = useState<DataType[]>([]);

    const formatDataSource = (users: Enrollment[]): DataType[] => {
        return users.map((user) => {
            const {
                _id,
                courseId,
                createdAt,
                enrollmentDate,
                learnerId,
                status
            } = user;

            const record: DataType = {
                // key: _id,
                _id,
                courseId,
                createdAt,
                enrollmentDate,
                learnerId,
                status,
                action: (
                    <div className="table-actions">
                        {/* <Link
                            className="btn btn-sm btn-warning text-white me-1"
                            to={`/admin/users/${_id}/edit`}
                        >
                            <Pencil/>
                        </Link>
                        <Popconfirm
                            title="Are You sure you want to delete this user?"
                            onConfirm={() => deleteUser(_id)}
                            onCancel={() => message.error('Delete canceled!')}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Link className="btn btn-sm btn-danger text-white" to="#">
                                <Trash2/>
                            </Link>
                        </Popconfirm>*/}
                    </div>
                ),
            };
            return record;
        });
    };

    useEffect(() => {
        async function loadUsers() {
            try {
                const res = await CourseService.getMyAllEnrollments();
                if (isMounted) {
                    setUsers(res.data);
                    setFilteredUsers(res.data);
                }
            } catch (error: any) {
                console.error(error.response.data);
            }
        }

        let isMounted = true;

        loadUsers();
        return () => {
            // TODO unset tableDataSource[]
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        setTableDataSource(formatDataSource(filteredUsers));
    }, [filteredUsers])


    const generatePDF = (): void => {
        const doc = new JsPDF();

        // Add a title to the document
        doc.text("User Report", 14, 20);

        // Create a table
        const tableData = users.map((user) => [
            user.courseId,
            user.createdAt,
            user.enrollmentDate,
            user.learnerId,
            user.status,
        ]);
        autoTable(doc, {
            head: [['_id', 'courseId', 'createdAt', 'enrollmentDate', 'learnerId', 'status']],
            body: tableData,
        })

        // Save the document
        doc.save(`users-report-${getCurrentDateTime()}.pdf`);
    };

    const handleSearch = (e: any) => {
        console.log(e.target.value)
        const data = users.filter((item) => {
            return Object.keys(item).some((key) => {
                if (item[key] !== undefined) {
                    return item[key]!.toString().toLowerCase().includes(e.target.value.toLowerCase())
                }
                return false;
            })
        });
        setFilteredUsers(data);
    };
    return (<>
            <PageHeader className="ninjadash-page-header-main" title="Manage Users" routes={BreadcrumbItem}/>
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
                                    </Button>{/* <Link className="btn btn-primary h-auto" type="link" to="/admin/users/create">
                                        <Plus/> Add New
                                    </Link>*/}

                                </>
                            }>
                                {
                                    tableDataSource.length === 0 ? (
                                        <Col md={24}>
                                            <NotFoundWrapper>
                                                <Heading as="h1">No Users Found</Heading>
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

export default ManageUsers;