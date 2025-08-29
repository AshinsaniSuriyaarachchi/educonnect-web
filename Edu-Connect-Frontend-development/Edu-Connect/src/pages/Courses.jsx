import React, { useEffect, useState } from 'react';
import ContentListingGrid from "../components/ContentListingGrid.jsx";
import backgroundImage from "../assets/courseBackGroundImg.png";
import CourseServices from "../services/CourseServices.js";

const Courses = () => {
    const [courseList, setCourseList] = useState([]); // Initialize as empty array

    const fetchCourseList = async () => {
        const res = await CourseServices.getAllCourses();
        setCourseList(res.courseList ? res.courseList : []);
        console.log({ res });
    };

    useEffect(() => {
        fetchCourseList();
    }, []);

    const filterOptions = [
        {
            label: 'Faculty',
            options: [
                { id: 'computing', label: 'Computing' },
                { id: 'engineering', label: 'Engineering' },
                { id: 'business', label: 'Business' },
                { id: 'science', label: 'Science' },
            ],
        },
        {
            label: 'Degree',
            options: [
                { id: 'ugc', label: 'UGC' },
                { id: 'foreign', label: 'Foreign' },
            ],
        },
        {
            label: 'Duration',
            options: [
                { id: '3', label: '3 Years' },
                { id: '4', label: '4 Years' },
            ],
        },
    ];

    return (
        <ContentListingGrid
            title="OUR COURSES"
            backgroundImage={backgroundImage}
            description="Find the perfect course to advance your career and expand your knowledge."
            items={courseList} // This will now be an empty array instead of undefined
            filters={filterOptions}
            type="courses" // specifying that this is for courses
        />
    );
};

export default Courses;
