import React, {lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import DashboardLayout from "../../views/dashboard/layout/DashboardLayout";
import UpdateUser from "../../views/dashboard/admin/users/UpdateUser";

const NotFound = lazy(() => import('../../views/errors/NotFound'));
const CreateSpectacle = lazy(() => import("../../views/dashboard/admin/spectacles/Create"));
const EditSpectacle = lazy(() => import("../../views/dashboard/admin/spectacles/Create"));
const ManageUsers = lazy(() => import("../../views/dashboard/admin/users/Manage"));
const ManageSpectacles = lazy(() => import("../../views/dashboard/admin/spectacles/Manage"));
const ManageBlogs = lazy(() => import("../../views/dashboard/admin/blogs/Manage"));
const CreateBlog = lazy(() => import("../../views/dashboard/admin/blogs/Create"));
const EditBlog = lazy(() => import("../../views/dashboard/admin/blogs/Create"));
const ManageOrders = lazy(() => import("../../views/dashboard/admin/orders/Manage"));
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

                <Route path="/spectacles" element={<ManageSpectacles/>}/>
                <Route path="/spectacles/create" element={<CreateSpectacle enableEdit={false}/>}/>
                <Route path="/spectacles/:spectacle/edit" element={<EditSpectacle enableEdit/>}/>

                <Route path="/blogs" element={<ManageBlogs/>}/>
                <Route path="/blogs/create" element={<CreateBlog enableEdit={false}/>}/>
                <Route path="/blogs/:blog/edit" element={<EditBlog enableEdit/>}/>

                <Route path="/orders" element={<ManageOrders/>}/>
                <Route path="/*" element={<NotFound/>}/>
            </Routes>
        </DashboardLayout>
    );
}

export default LecturerRoutes;
