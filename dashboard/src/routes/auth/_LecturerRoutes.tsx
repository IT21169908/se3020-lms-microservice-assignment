import React, {lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import DashboardLayout from "../../views/dashboard/layout/DashboardLayout";
import UpdateUser from "../../views/dashboard/lecturer/users/UpdateUser";

const NotFound = lazy(() => import('../../views/errors/NotFound'));
const CourseCreate = lazy(() => import("../../views/dashboard/lecturer/courses/Create"));
const EditCourse = lazy(() => import("../../views/dashboard/lecturer/courses/Create"));
const ManageUsers = lazy(() => import("../../views/dashboard/lecturer/users/Manage"));
const ManageCourses = lazy(() => import("../../views/dashboard/lecturer/courses/Manage"));
const Dashboard = lazy(() => import("../../views/dashboard/Dashboard"));

function LecturerRoutes() {
    // TODO: decide whether to apply DashboardLayout. best approach
    return (
        <DashboardLayout>
            <Routes>
                <Route index path="/*" element={<Dashboard/>}/>
                <Route path="/users" element={<ManageUsers/>}/>
                <Route path="/users" element={<ManageUsers/>}/>
                <Route path="/users/:user_id/edit" element={<UpdateUser enableEdit/>}/>

                <Route path="/courses" element={<ManageCourses/>}/>
                <Route path="/courses/create" element={<CourseCreate enableEdit={false}/>}/>
                <Route path="/courses/:course/edit" element={<EditCourse enableEdit/>}/>

                <Route path="/*" element={<NotFound/>}/>
            </Routes>
        </DashboardLayout>
    );
}

export default LecturerRoutes;
