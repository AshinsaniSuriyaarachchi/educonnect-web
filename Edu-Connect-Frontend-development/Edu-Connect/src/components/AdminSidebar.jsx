import React from 'react';
import {
    Box,
    List,
    ListItem,
    ListItemText,
    Paper
} from '@mui/material';
import AddCourses from '../assets/adminSidebar/AddCourses.png';
import AddUniversity from '../assets/adminSidebar/AddUniversity.png';
import MyCourses from '../assets/adminSidebar/MyCourses.png';
import Logo from '../assets/LogoBGRemoved.png';

const AdminSidebar = ({selected, setSelected}) => {
    const menuItems = [
        {text: 'Add University', icon: AddUniversity, type: 'add-university'},
        {text: 'Add Courses', icon: AddCourses, type: 'add-courses'},
        {text: 'My Courses', icon: MyCourses, type: 'my-courses'},
    ];

    return (
        <Paper
            elevation={0}
            sx={{
                width: 250,
                height: '100vh',
                backgroundColor: '#C19AC98C',
                borderRadius: 0,
            }}
        >
            <Box sx={{p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Box component='img' src={Logo} width={115} height={100}/>
            </Box>

            <List sx={{p: 2}}>
                {menuItems.map((item) => (
                    <ListItem
                        key={item.type}
                        button
                        onClick={() => setSelected(item.type)}
                        sx={{
                            borderRadius: 2,
                            mb: 1,
                            backgroundColor: selected === item.type ? '#ffffff' : 'transparent',
                            '&:hover': {
                                backgroundColor: selected === item.type ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                            },
                            cursor: 'pointer'
                        }}
                    >
                        <Box component='img' src={item.icon} width={20} height={20} sx={{m: 1}}/>
                        <ListItemText
                            primary={item.text}
                            sx={{
                                '& .MuiListItemText-primary': {
                                    color: '#000',
                                    fontWeight: selected === item.type ? 600 : 400,
                                },
                            }}
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default AdminSidebar;