import React, { useState } from 'react';
import {
    Box, Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Input,
    Typography
} from '@mui/material';
import CourseCard from "./CourseCard.jsx";
import UniversityCard from "./UniversityCard.jsx";
import Stack from "@mui/material/Stack";

const ContentListingGrid = ({
                                title,
                                backgroundImage,
                                description,
                                items,
                                filters,
                                type = 'courses',
                                exploreMore = false
                            }) => {
    const [filterState, setFilterState] = useState({
        faculty: [],
        degreeType: [],
        duration: []
    });
    const [searchTerm, setSearchTerm] = useState('');

    const handleFilterChange = (filterCategory, id) => {
        setFilterState(prevState => ({
            ...prevState,
            [filterCategory]: prevState[filterCategory].includes(id)
                ? prevState[filterCategory].filter(f => f !== id)
                : [...prevState[filterCategory], id]
        }));
    };

    const getFilterCategory = (sectionLabel) => {
        switch (sectionLabel.toLowerCase()) {
            case 'faculty':
                return 'faculty';
            case 'degree':
                return 'degreeType';
            case 'duration':
                return 'duration';
            default:
                return '';
        }
    };

    const filteredItems = Array.isArray(items) ? items.filter(item => {
        // Search term filter
        const matchesSearch = !searchTerm || [
            item.degreeName,
            item.faculty,
            item.type,
            item.duration?.toString()
        ].some(field =>
            field?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Faculty filter
        const matchesFaculty = filterState.faculty.length === 0 ||
            filterState.faculty.some(f =>
                item.faculty?.toLowerCase() === f.toLowerCase()
            );

        // Degree type filter
        const matchesDegreeType = filterState.degreeType.length === 0 ||
            filterState.degreeType.some(d =>
                item.degreeType?.toLowerCase() === d.toLowerCase()
            );

        // Duration filter
        const matchesDuration = filterState.duration.length === 0 ||
            filterState.duration.some(d =>
                item.duration?.toString() === d
            );

        return matchesSearch && matchesFaculty && matchesDegreeType && matchesDuration;
    }) : [];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Hero Section */}
            <Box
                sx={{
                    width: '100%',
                    height: 420,
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 4,
                    color: 'white'
                }}
            >
                <Typography variant="h2" sx={{ mb: 2 }}>
                    {title}
                </Typography>
                <Typography variant="h5" sx={{ mb: 4, maxWidth: 'xl', textAlign: 'center' }}>
                    {description}
                </Typography>
                <Box sx={{ position: 'relative', width: 650 }}>
                    <Input
                        type="text"
                        placeholder={`Search ${type}...`}
                        fullWidth
                        sx={{ height: 50, pl: 6, bgcolor: 'white', color: 'black' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Box>
            </Box>

            {/* Content Section */}
            <Box sx={{ display: 'flex', flex: 1, my: 2 }}>
                {/* Filters */}
                {filters && (
                    <Box
                        sx={{
                            width: '25%',
                            p: 4,
                            bgcolor: '#FFFFFF',
                            borderRight: '2px solid #E0E0E0',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            {`FILTER YOUR ${type.toUpperCase()}`}
                        </Typography>

                        {filters.map((section) => (
                            <Box key={section.label} sx={{ mb: 3 }}>
                                <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
                                    {section.label}
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    {section.options.map((option) => (
                                        <FormControlLabel
                                            key={option.id}
                                            control={
                                                <Checkbox
                                                    checked={filterState[getFilterCategory(section.label)]
                                                        .includes(option.id)}
                                                    onChange={() => handleFilterChange(
                                                        getFilterCategory(section.label),
                                                        option.id
                                                    )}
                                                />
                                            }
                                            label={option.label}
                                        />
                                    ))}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                )}

                {/* Content Grid */}
                <Box sx={{ width: filters ? '75%' : '100%', p: 4 }}>
                    {exploreMore && (
                        <Stack direction="row" spacing={2} mb={4}>
                            <Typography>
                                Looking for something else ? Explore here.
                            </Typography>
                            <Button sx={{
                                mr: 2,
                                bgcolor: '#C19AC9',
                                '&:hover': { bgcolor: '#A881B0' },
                                color: 'white',
                            }}>
                                Explore BSC
                            </Button>
                            <Button sx={{
                                mr: 2,
                                bgcolor: '#C19AC9',
                                '&:hover': { bgcolor: '#A881B0' },
                                color: 'white',
                            }}>
                                Explore PHD
                            </Button>
                        </Stack>
                    )}
                    <Grid container spacing={3}>
                        {filteredItems.length === 0 ? (
                            <Grid item xs={12}>
                                <Typography variant="h6" align="center">
                                    No items found.
                                </Typography>
                            </Grid>
                        ) : (
                            filteredItems.map((item) => (
                                <Grid item key={item.id} xs={6}>
                                    {type === 'courses' ? (
                                        <CourseCard courseData={item} />
                                    ) : (
                                        <UniversityCard university={item} />
                                    )}
                                </Grid>
                            ))
                        )}
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};

export default ContentListingGrid;