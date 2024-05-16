import React, {lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import DashboardLayout from "../../views/dashboard/layout/DashboardLayout";

const NotFound = lazy(() => import('../../views/errors/NotFound'));
const Dashboard = lazy(() => import("../../views/dashboard/Dashboard"));

function StudentRoutes() {
    return (
        <DashboardLayout>
            <Routes>
                <Route index path="/*" element={<Dashboard/>}/>
            </Routes>
        </DashboardLayout>
    );
}

export default StudentRoutes;
