import React from 'react';
import {
    Grid,
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Avatar,
    Typography,
    Paper
} from '@mui/material';
import {
    School,
    Security,
    Person,
    Help,
    QuestionAnswer,
    Add
} from '@mui/icons-material';

const SidebarMenu = ({type, setType}) => {

    const menuItems = [
        {text: "Saved University's", icon: <School/>, type: "saved-universities"},
        {text: 'Privacy Policy', icon: <Security/>, type: "privacy"},
        {text: 'My Profiles', icon: <Person/>, type: "my-profiles"},
        {text: 'Help & Support', icon: <Help/>, type: "help"},
        {text: 'FAQ', icon: <QuestionAnswer/>, type: "faq"},
        {text: "What's New", icon: <Add/>, type: "new"},
    ];

    const userName = localStorage.getItem("userName");

    return (
        <Grid item xs={12} md={4} mb={5}>
            <Paper
                elevation={0}
                sx={{
                    maxWidth: 360,
                    margin: '0 auto',
                }}
            >
                <Box
                    sx={{
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        border: '1px solid #e0e0e0',
                        borderRadius: 2,
                        backgroundColor: '#fff'
                    }}
                >
                    <Avatar sx={{backgroundColor: '#e0e0e0', width: 40, height: 40}}>
                        <Person sx={{color: '#757575'}}/>
                    </Avatar>
                    <Box>
                        <Typography variant="body2" color="text.secondary">
                            Hello,
                        </Typography>
                        <Typography variant="subtitle1" sx={{fontWeight: 500}}>
                            {userName}
                        </Typography>
                    </Box>
                </Box>

                <List sx={{width: '100%', p: 0, mt: 5}}>
                    {menuItems?.map((item, index) => (
                        <ListItem
                            key={index}
                            button
                            sx={{
                                py: 1.5,
                                mt: 1,
                                border: '1px solid #e0e0e0',
                                borderRadius: 2,
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                },
                                cursor: 'pointer'
                            }}
                            onClick={() => {
                                // navigate(item.type);
                                setType(item.type);
                            }}
                        >
                            <ListItemIcon sx={{minWidth: 40}}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                sx={{
                                    '& .MuiListItemText-primary': {
                                        color: type === item?.type ? "#9c27b0" : "#757575",
                                        fontSize: '0.95rem',
                                    },
                                }}
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Grid>
    );
};

export default SidebarMenu;