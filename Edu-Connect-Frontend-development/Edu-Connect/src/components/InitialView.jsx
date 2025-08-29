import React from 'react';
import {Box, Button, Grid, Typography} from "@mui/material";
import InitialViewImg from '../assets/InitialViewImg.png';

const InitialView = () => {
    return (
        <Box sx={{backgroundColor: "#C19AC926"}}>
            <Grid container>
                <Grid item xs={12} md={6} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <Box p={{sm: 8, xs: 4}} sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
                            <Typography sx={{fontSize: {xs: 35, md: 50}, fontWeight: 600, lineHeight: 1.2}}>
                                Find the{' '}
                            </Typography>
                            <Typography
                                sx={{fontSize: {xs: 35, md: 50}, fontWeight: 600, color: '#C19AC9', lineHeight: 1.2}}>
                                Right Path{' '}
                            </Typography>
                            <Typography sx={{fontSize: {xs: 35, md: 50}, fontWeight: 600, lineHeight: 1.2}}>
                                to
                            </Typography>
                            <Typography sx={{
                                fontSize: {xs: 35, md: 50},
                                fontWeight: 600,
                                lineHeight: 1.2,
                                display: 'block',
                                width: '100%'
                            }}>
                                Your Dream Career
                            </Typography>
                        </Box>
                        <Typography sx={{color: "#757575", fontSize: 20, fontWeight: 500}}>
                            Explore a wide range of universities and courses that align with your passion and career
                            goals. Let us guide you to make the best educational choices and create a brighter future.
                        </Typography>
                        <Button sx={{
                            width: 100,
                            backgroundColor: '#C19AC9',
                            color: '#FFFFFF',
                            '&:hover': {backgroundColor: '#A87FB1'}
                        }}>
                            <Typography sx={{fontWeight: 600}}>LET'S TALK</Typography>
                        </Button>
                    </Box>
                </Grid>

                <Grid item xs={12} md={6} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Box component='img' src={InitialViewImg} width={{sm: 560, xs: 300}} height={{sm: 600}}>
                    </Box>
                </Grid>
            </Grid>
        </Box>

    );
};

export default InitialView;