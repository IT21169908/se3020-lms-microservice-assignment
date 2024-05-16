import React, {lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import DashboardLayout from "../../views/dashboard/layout/DashboardLayout";
import UpdateUser from "../../views/dashboard/lecturer/users/UpdateUser";

const NotFound = lazy(() => import('../../views/errors/NotFound'));
const CreateSpectacle = lazy(() => import("../../views/dashboard/lecturer/spectacles/Create"));
const EditSpectacle = lazy(() => import("../../views/dashboard/lecturer/spectacles/Create"));
const ManageUsers = lazy(() => import("../../views/dashboard/lecturer/users/Manage"));
const ManageSpectacles = lazy(() => import("../../views/dashboard/lecturer/spectacles/Manage"));
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

                <Route path="/courses" element={<ManageSpectacles/>}/>
                <Route path="/courses/create" element={<CreateSpectacle enableEdit={false}/>}/>
                <Route path="/courses/:spectacle/edit" element={<EditSpectacle enableEdit/>}/>

                <Route path="/*" element={<NotFound/>}/>
            </Routes>
        </DashboardLayout>
    );
}

export default LecturerRoutes;
