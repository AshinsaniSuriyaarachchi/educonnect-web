import React, {useEffect, useState} from 'react';
import ContentListingGrid from "../components/ContentListingGrid.jsx";
import backgroundImage from "../assets/universityBackgroundImg.png"
import {UniversityServices} from "../services/UniversityServices.js";

const Universities = () => {
    const [universities, setUniversities] = useState([])
    const fetchUniversities = async () => {
        const res = await UniversityServices.getUniversities();

        setUniversities(res.universityList);
        console.log({res})
    }

    useEffect(() => {
        fetchUniversities()

    }, []);


    return (
        <ContentListingGrid
            title="UNIVERSITIES"
            backgroundImage={backgroundImage}
            description="Your Gateway to a Better Academic Experience. Discover a World of Opportunities."
            items={universities}
            type="universities"
        />
    );
};

export default Universities;