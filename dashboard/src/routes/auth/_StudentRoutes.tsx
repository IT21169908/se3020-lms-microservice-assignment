import React, {lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import DashboardLayout from "../../views/dashboard/layout/DashboardLayout";
import CourseList from "../../views/dashboard/student/courses/Courses";
import Enroll from "../../views/dashboard/student/courses/Enroll";

const NotFound = lazy(() => import('../../views/errors/NotFound'));
const Dashboard = lazy(() => import("../../views/dashboard/Dashboard"));

function StudentRoutes() {
    return (
        <DashboardLayout>
            <Routes>
                <Route index path="/*" element={<Dashboard/>}/>

                <Route path="/courses" element={<CourseList/>}/>
                <Route path="/courses/enroll" element={<Enroll/>}/>
            </Routes>
        </DashboardLayout>
    );
}

export default StudentRoutes;
