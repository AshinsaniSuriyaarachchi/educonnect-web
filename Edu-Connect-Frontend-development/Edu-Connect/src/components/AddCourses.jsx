import React, {useEffect, useState} from 'react';
import {
    Box,
    Typography,
    TextField,
    MenuItem,
    Grid,
    Button,
    styled
} from '@mui/material';
import {useForm, Controller} from 'react-hook-form';
import courseService from "../services/CourseServices.js";
import {UniversityServices} from "../services/UniversityServices.js";
import {toast} from "react-toastify";

// Mock data for dropdowns remain the same
const facultyOptions = [
    {label: 'computing', value: 'COMPUTING'},
    {label: 'engineering', value: 'ENGINEERING'},
    {label: 'business', value: 'BUSINESS'},
    {label: 'science', value: 'SCIENCE'}
];

const degreeTypeOptions = [
    {value: 'UGC', label: 'UGC'},
    {value: 'FOREIGN', label: 'Foreign'},
];

const durationOptions = [
    {value: '3', label: '3 Years'},
    {value: '4', label: '4 Years'}
];

const typeOptions = [
    {value: 'OL', label: 'After OL'},
    {value: 'AL', label: 'After AL'}
];

const StyledTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        backgroundColor: '#FFFFFF',
        height: '48px',
        '& fieldset': {
            borderColor: 'transparent',
        },
        '&:hover fieldset': {
            borderColor: 'transparent',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'transparent',
            boxShadow: 'none',
        },
    },
    '& .MuiInputLabel-root': {
        color: '#6B7280',
        fontSize: '14px',
        '&.Mui-focused': {
            color: '#6B7280',
        },
    },
    '& .MuiInputBase-input': {
        padding: '12px 14px',
        fontSize: '14px',
    },
    '& .MuiInputBase-multiline': {
        height: 'auto',
        padding: 0,
    },
    '& .MuiInputBase-inputMultiline': {
        padding: '12px 14px',
    },
    '& .MuiSelect-icon': {
        color: '#6B7280',
    },
});

const AddCourses = () => {

    const [universities, setUniversities] = useState([])


    const {control, handleSubmit, formState: {errors}, reset} = useForm({
        defaultValues: {
            type: '',
            university: '',
            degreeName: '',
            degreeWebsiteLink: '',
            faculty: '',
            duration: '',
            degreeType: '',
            fee: '',
            entryQualification: '',
            description: ''
        }
    });

    const fetchUniversities = async () => {
        const res = await UniversityServices.getUniversities();
        const mappedUniversities = res.universityList.map((university) => ({
            label: university.universityName,
            value: university.universityId
        }))
        setUniversities(mappedUniversities);
        console.log({res})
    }

    useEffect(() => {
        fetchUniversities()

    }, []);

    const onSubmit = async (data) => {
        const res = await courseService.saveCourse({
            degreeName: data.degreeName,
            link: data.degreeWebsiteLink, // Map degreeWebsiteLink to link
            faculty: data.faculty,
            degreeType: data.degreeType,
            type: data.type,
            duration: data.duration,
            fee: data.fee,
            entryQualification: data.entryQualification,
            description: data.description,
            university: data.university
        })
        console.log(res);
        if(res.message === "Course Save Successful"){
            toast.success(res.message);
            reset();
        } else {
            toast.error(res.message);
        }
    };

    return (
        <Grid container spacing={0}>
            <Grid item xs={12}>
                <Box>
                    <Typography variant="h6" sx={{mb: 3}}>
                        Add New Courses
                    </Typography>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2} sx={{
                            p: 3,
                            backgroundColor: '#F9FAFB',
                            borderRadius: '8px',
                        }}>
                            <Grid item xs={12}>
                                <Controller
                                    name="type"
                                    control={control}
                                    rules={{required: 'Type is required'}}
                                    render={({field}) => (
                                        <StyledTextField
                                            {...field}
                                            select
                                            fullWidth
                                            label="Type"
                                            error={!!errors.type}
                                            helperText={errors.type?.message}
                                        >
                                            {typeOptions.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </StyledTextField>
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12}>

                                <Controller
                                    name="university"
                                    control={control}
                                    rules={{required: 'University is required'}}
                                    render={({field}) => (
                                        <StyledTextField
                                            {...field}
                                            select
                                            fullWidth
                                            label="University"
                                            error={!!errors.university}
                                            helperText={errors.university?.message}
                                        >
                                            {universities.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </StyledTextField>
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="degreeName"
                                    control={control}
                                    rules={{required: 'Degree name is required'}}
                                    render={({field}) => (
                                        <StyledTextField
                                            {...field}
                                            fullWidth
                                            label="Degree Name"
                                            error={!!errors.degreeName}
                                            helperText={errors.degreeName?.message}
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="degreeWebsiteLink"
                                    control={control}
                                    rules={{required: 'Degree website link required'}}
                                    render={({field}) => (
                                        <StyledTextField
                                            {...field}
                                            fullWidth
                                            label="Degree Website link"
                                            error={!!errors.degreeWebsiteLink}
                                            helperText={errors.degreeWebsiteLink?.message}
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="faculty"
                                    control={control}
                                    rules={{required: 'Faculty is required'}}
                                    render={({field}) => (
                                        <StyledTextField
                                            {...field}
                                            select
                                            fullWidth
                                            label="Faculty"
                                            error={!!errors.faculty}
                                            helperText={errors.faculty?.message}
                                        >
                                            {facultyOptions.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </StyledTextField>
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="degreeType"
                                    control={control}
                                    rules={{required: 'Degree Type is required'}}
                                    render={({field}) => (
                                        <StyledTextField
                                            {...field}
                                            select
                                            fullWidth
                                            label="Degree Type"
                                            error={!!errors.degreeType}
                                            helperText={errors.degreeType?.message}
                                        >
                                            {degreeTypeOptions.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </StyledTextField>
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="duration"
                                    control={control}
                                    rules={{required: 'Duration is required'}}
                                    render={({field}) => (
                                        <StyledTextField
                                            {...field}
                                            select
                                            fullWidth
                                            label="Duration"
                                            error={!!errors.duration}
                                            helperText={errors.duration?.message}
                                        >
                                            {durationOptions.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </StyledTextField>
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="fee"
                                    control={control}
                                    rules={{required: 'Degree Fee is required'}}
                                    render={({field}) => (
                                        <StyledTextField
                                            {...field}
                                            fullWidth
                                            label="Degree Fee"
                                            error={!!errors.fee}
                                            helperText={errors.fee?.message}
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Controller
                                    name="entryQualification"
                                    control={control}
                                    rules={{required: 'Entry qualification is required'}}
                                    render={({field}) => (
                                        <StyledTextField
                                            {...field}
                                            fullWidth
                                            multiline
                                            rows={3}
                                            label="Entry Qualification"
                                            error={!!errors.entryQualification}
                                            helperText={errors.entryQualification?.message}
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Controller
                                    name="description"
                                    control={control}
                                    rules={{required: 'Description is required'}}
                                    render={({field}) => (
                                        <StyledTextField
                                            {...field}
                                            fullWidth
                                            multiline
                                            rows={4}
                                            label="Short Description about Degree"
                                            error={!!errors.description}
                                            helperText={errors.description?.message}
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{
                                            bgcolor: '#C19AC9',
                                            '&:hover': {
                                                bgcolor: '#C19AD1'
                                            },
                                            width: '365px'
                                        }}
                                    >
                                        Add Course
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Grid>
        </Grid>
    );
};

export default AddCourses;