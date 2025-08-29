import React, {useState} from 'react';
import {Box} from '@mui/material';
import AddUniversity from "../components/AddUniversity.jsx";
import AddCourses from "../components/AddCourses.jsx";
import MyCourses from "../components/MyCourses.jsx";
import AdminSidebar from "../components/AdminSidebar.jsx";

const AdminDashboard = () => {
    const [selectedMenu, setSelectedMenu] = useState('my-courses');

    const renderContent = () => {
        switch (selectedMenu) {
            case 'add-university':
                return <AddUniversity/>;
            case 'add-courses':
                return <AddCourses/>;
            case 'my-courses':
                return <MyCourses/>;
            default:
                return <MyCourses/>;
        }
    };

    return (
        <Box sx={{display: 'flex', minHeight: '100vh'}}>
            <Box sx={{position: 'fixed'}}>
                <AdminSidebar selected={selectedMenu} setSelected={setSelectedMenu}/>
            </Box>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    ml: '250px',
                    p: 3
                }}
            >
                <Box sx={{mt: 2}}>
                    {renderContent()}
                </Box>
            </Box>
        </Box>
    );
};

export default AdminDashboard;