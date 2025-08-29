import React, {useEffect, useState} from 'react';
import {Grid, Typography} from "@mui/material";
import UniversityCardSm from "./UniversityCardSM.jsx";
import userServices from "../services/UserServices.js";

const SavedUniversities = () => {

    const userId = Number(localStorage.getItem("userId"));
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        if (userId) {
            fetchSavedCourses();
        } else {
            console.warn("User ID is missing or invalid.");
        }
    }, [userId]);

    console.log("courses: ", courses);

    const fetchSavedCourses = async () => {
        try {
            const response = await userServices.getSavedCourses(userId);
            console.log("response:", response);
            if (response?.responseCode === "200") {
                const formattedCourses = response?.savedCourseList.map(savedCourse => ({
                    universityLogo: `data:${savedCourse.course.university?.logoContentType};base64,${savedCourse.course.university?.logo}`,
                    courseName: savedCourse.course.degreeName,
                    university: savedCourse.course.university.universityName,
                    timePeriod: savedCourse.course.duration,
                }));

                setCourses(formattedCourses);
            }
        } catch (error) {
            console.error("Failed to fetch saved courses:", error);
        }
    };

    return (
        <Grid container spacing={3}>
            {courses && courses.length > 0 ? (
                courses.map((course, index) => (
                    <Grid item xs={12} sm={6} key={index} p={3}>
                        <UniversityCardSm
                            course={course}
                        />
                    </Grid>
                ))
            ) : (
                <Grid item xs={12}>
                    <Typography sx={{fontWeight: 600, fontSize: 20}}>
                        No Saved Courses Yet
                    </Typography>
                    <Typography sx={{color: '#757575', fontWeight: 500}}>
                        You haven't saved any courses yet, or the courses you saved may have been deleted by the
                        university.
                    </Typography>
                </Grid>
            )}
        </Grid>
    );
};

export default SavedUniversities;