import React from 'react';
import {Box, Typography, Paper, Button} from '@mui/material';
import DeleteIcon from '../assets/DeleteIcon.png';

const UniversityCardSm = ({course, isAdmin, onEdit, onDelete}) => {
    const handleEdit = (e) => {
        e.stopPropagation();
        onEdit?.(course);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        onDelete?.(course);
    };

    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                border: '1px solid #e0e0e0',
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                backgroundColor: '#f5f5f5',
                cursor: 'pointer',
                position: 'relative',
            }}
        >
            {isAdmin && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        zIndex: 1,
                    }}
                >
                    <Button
                        onClick={handleEdit}
                        sx={{
                            backgroundColor: '#C19AC9',
                            '&:hover': {
                                backgroundColor: '#B784C0',
                            },
                            height: 25,
                            minWidth: 'unset',
                            boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                        }}
                    >
                        <Typography sx={{color: '#FFFFFF', m: 0.75}}>Edit</Typography>
                    </Button>
                    <Box component='img' src={DeleteIcon} width={20} height={20} onClick={handleDelete}/>
                </Box>
            )}

            <Box
                component="img"
                src={course.universityLogo}
                alt={course.university}
                sx={{
                    width: 250,
                    height: 'auto',
                    maxHeight: 80,
                    objectFit: 'contain',
                }}
            />
            <Box>
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontWeight: 600,
                        mb: 1,
                    }}
                >
                    {course.courseName}
                </Typography>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography
                        sx={{fontWeight: 600, color: "#757575"}}
                    >
                        {course.university}
                    </Typography>

                    <Typography
                        sx={{fontWeight: 500, color: "#757575"}}
                    >
                        {course.timePeriod} Years
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
};

export default UniversityCardSm;