import React from 'react';
import {Box, Grid, Typography} from "@mui/material";
import AboutUsImg from "../assets/AboutUsImg.png";

const AboutUs = () => {
    return (
        <Grid container sx={{display: 'flex', alignItems: 'center'}}>
            <Grid item xs={12} md={6} sx={{display: 'flex', justifyContent: 'center'}}>
                <Box component='img' src={AboutUsImg} width={500} height={550}/>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Typography sx={{fontWeight: 600, fontSize: 20}}>
                        ABOUT US
                    </Typography>
                    <Typography sx={{fontWeight: 600, fontSize: 20}}>
                        Empowering Your Educational Journey: Connecting You to the Best Universities and Courses
                    </Typography>
                    <Typography sx={{fontWeight: 500, color: '#757575', mt: 2}}>
                        At EduConnect, we are dedicated to empowering students with the knowledge they need to make the
                        best educational choices. Our mission is to connect aspiring students with the top universities
                        and courses that fit their individual goals. Whether you’re seeking information about a specific
                        program or need guidance to navigate your educational journey, EduConnect is here to support you
                    </Typography>
                    <Typography sx={{fontWeight: 500, color: '#757575', mt: 2}}>
                        We believe that education is the key to unlocking a successful future. That’s why we strive to
                        provide personalized support and resources that inspire students to make informed decisions. Our
                        goal is to make the process of finding the right university and course seamless,
                        straightforward, and accessible to all.
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
};

export default AboutUs;