import { Box, Button, Typography, Chip } from "@mui/material";
import React from "react";
import userServices from "../services/UserServices.js";
import {toast} from "react-toastify";

const CourseCard = ({ courseData }) => {
    console.log("course data :", courseData);
    // Check if courseData is defined, if not return null or a loading placeholder
    if (!courseData) {
        return null; // or you could return a loading spinner
    }
    const userId = Number(localStorage.getItem("userId"));

    const {
        degreeName,
        duration,
        fee,
        faculty,
        degreeType,
        type,
        description,
        university,
    } = courseData;

    const handleCourseSave = async () => {
        const response = await userServices.saveCourse(userId, courseData.courseId);
        console.log("response :", response);
        if(response?.responseCode === "200"){
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
    }

    const formatFee = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'LKR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <Box
            sx={{
                maxWidth: 474,
                maxHeight: 412,
                minHeight: 412,
                display: 'flex',
                flexDirection: 'column',
                bgcolor: '#F3F3F3',
                borderRadius: '20px',
                p: 2,
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    pb: 2,
                }}
            >
                <Box
                    component="img"
                    src={`data:${university.logoContentType};base64,${university.logo}`}
                    alt={university.universityName}
                    sx={{
                        width: 316,
                        height: 129,
                        objectFit: 'contain',
                        mb: 2
                    }}
                />
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: '600',
                        fontSize: '20px',
                        alignSelf: 'start',
                        mb: 1
                    }}
                >
                    {degreeName}
                </Typography>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    mb: 2
                }}
            >
                <Typography sx={{ color: '#757575', fontSize: 16, fontWeight: '600' }}>
                    {university.universityName} • {duration} Years
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip
                        label={faculty}
                        size="small"
                        sx={{ bgcolor: '#E0E0E0' }}
                    />
                    <Chip
                        label={degreeType}
                        size="small"
                        sx={{ bgcolor: '#E0E0E0' }}
                    />
                    <Chip
                        label={type}
                        size="small"
                        sx={{ bgcolor: '#E0E0E0' }}
                    />
                </Box>

                <Typography sx={{ color: '#1976d2', fontWeight: '600' }}>
                    {formatFee(fee)}
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3,
                        textOverflow: 'ellipsis',
                    }}
                >
                    {description}
                </Typography>
            </Box>

            <Box
                sx={{
                    mt: 'auto',
                    display: 'flex',
                    gap: 2,
                }}
            >
                <Button
                    variant="contained"
                    href={university.link}
                    target="_blank"
                    sx={{
                        flex: 1,
                        bgcolor: '#C19AC9',
                        '&:hover': { bgcolor: '#A881B0' },
                        color: 'white',
                    }}
                >
                    Learn More
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        flex: 1,
                        bgcolor: '#C19AC9',
                        '&:hover': { bgcolor: '#A881B0' },
                    }}
                    onClick={handleCourseSave}
                >
                    Save
                </Button>
            </Box>
        </Box>
    );
};

export default CourseCard;
