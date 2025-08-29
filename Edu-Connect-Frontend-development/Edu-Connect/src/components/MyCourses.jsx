import React, {useEffect, useState} from 'react';
import {Grid, Typography} from "@mui/material";
import UniversityCardSm from "./UniversityCardSM.jsx";
import courseService from "../services/CourseServices.js";

const MyCourses = () => {

    const [courses, setCourses] = useState([]);
    const userId = Number(localStorage.getItem("userId"));

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        const response = await courseService.getCoursesByUserId(userId);

        const formattedCourses = response?.courseList.map(course => ({
            courseId: course.courseId,
            universityLogo: `data:${course.university?.logoContentType};base64,${course.university?.logo}`,
            courseName: course.degreeName,
            university: course.university.universityName,
            timePeriod: course.duration,
        }));

        setCourses(formattedCourses);
    };

    const handleDelete = async (course) => {
        const response = await courseService.deleteCourse(course?.courseId);

        console.log("response :", response);
        fetchCourses();
    };

    return (
        <Grid container spacing={3} m={2}>
            <Grid item xs={12}>
                <Typography sx={{fontWeight: 600, fontSize: 20}}>
                    My Courses
                </Typography>
            </Grid>
            {courses && courses.length > 0 ? (
                courses.map((course, index) => (
                    <Grid item xs={10} sm={5} key={index} p={3}>
                        <UniversityCardSm
                            course={course}
                            isAdmin={true}
                            onDelete={handleDelete}
                        />
                    </Grid>
                ))
            ) : (
                <Grid item xs={12}>
                    <Typography sx={{fontWeight: 500, fontSize: 20}}>
                        No Courses Yet...
                    </Typography>
                </Grid>
            )}
        </Grid>
    );
};

export default MyCourses;