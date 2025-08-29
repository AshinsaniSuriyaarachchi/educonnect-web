import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const UniversityCard = ({ university }) => {
    const {
        universityName,
        description,
        link,
        logo,
        logoContentType
    } = university;

    // Convert base64 to image source
    const imageSource = logo && logoContentType ?
        `data:${logoContentType};base64,${logo}` :
        'placeholder-image-url.jpg';

    return (
        <Box
            sx={{
                width: '647px',
                height: '238px',
                backgroundColor: '#F3F3F3',
                padding: '24px',
                borderRadius: '8px',
                display: 'flex',
                gap: '24px'
            }}
        >
            {/* Logo Section */}
            <Box
                sx={{
                    maxWidth: '244px',
                    maxHeight: '132px',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <Box
                    component="img"
                    src={imageSource}
                    alt={`${universityName} Logo`}
                    sx={{
                        width: '100%',
                        objectFit: 'contain'
                    }}
                />
            </Box>

            {/* Content Section */}
            <Stack spacing={2} sx={{ flex: 1 }}>
                <Typography
                    sx={{
                        fontWeight: '600',
                        fontSize: '20px',
                        color: '#000000',
                        textTransform: 'uppercase'
                    }}
                >
                    {universityName}
                </Typography>

                <Typography sx={{
                    fontWeight: '500',
                    fontSize: '12px',
                    color: '#333333',
                    height: '80px'
                }}>
                    {description}
                </Typography>

                <Button
                    variant="contained"
                    href={link}
                    target="_blank"
                    sx={{
                        mr: 2,
                        width: 'fit-content',
                        textTransform: 'none',
                        bgcolor: '#C19AC9',
                        '&:hover': { bgcolor: '#A881B0' },
                        color: 'white',
                    }}
                >
                    Learn More
                </Button>
            </Stack>
        </Box>
    );
};

export default UniversityCard;