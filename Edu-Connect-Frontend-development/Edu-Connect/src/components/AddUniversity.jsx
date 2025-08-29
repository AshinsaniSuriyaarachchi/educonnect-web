import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    Box,
    Typography,
    TextField,
    Button,
    styled,
    IconButton,
    CircularProgress,
    Snackbar,
    Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import uploadIcon from "../assets/uploadIcon.png";
import ProfileIcon from "../assets/ProfileIcon.png";
import {UniversityServices as universityService} from "../services/UniversityServices.js";
import {Validators} from "../utils/Validator.js";
import Logout from "../assets/Logout.png";

const AddUniversity = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [selectedLogo, setSelectedLogo] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'success'
    });
    const userId = Number(localStorage.getItem("userId"));

    const StyledTextField = styled(TextField)({
        // ... existing styles ...
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            universityName: '',
            websiteUrl: '',
            description: '',
        }
    });
    const userName = localStorage.getItem("userName");

    const handleLogoChange = (event) => {
        const file = event.target.files[0];

        if (!file) return;

        if (!Validators.isValidImageType(file)) {
            showNotification('Please upload a valid image file (JPEG, PNG, or GIF)', 'error');
            return;
        }

        if (!Validators.isValidFileSize(file, 5)) {
            showNotification('Image size should not exceed 5MB', 'error');
            return;
        }

        // Update the selected file and create preview
        setSelectedLogo(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const showNotification = (message, severity = 'success') => {
        setNotification({
            open: true,
            message,
            severity
        });
    };

    const handleCloseNotification = () => {
        setNotification(prev => ({ ...prev, open: false }));
    };

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            if (!selectedLogo) {
                showNotification('Please select a university logo', 'error');
                return;
            }

            // Create FormData object
            const formData = new FormData();
            formData.append('logo', selectedLogo);

            // Create apiRequest object
            const apiRequest = {
                universityDTO: {
                    universityName: data.universityName,
                    link: data.websiteUrl,
                    description: data.description,
                },
                userId: userId
            };

            // Append stringified apiRequest
            formData.append('apiRequest', JSON.stringify(apiRequest));

            // Make API call using service
            const result = await universityService.saveUniversity(formData);

            if(result.message === 'University Save Successful'){
                showNotification('University saved successfully!');
            } else {
                showNotification('University save failed!');
            }


            // Reset form
            reset();
            setSelectedLogo(null);
            setPreviewUrl(null);

            // Optionally navigate to universities list
            // navigate('/universities');

        } catch (error) {
            showNotification(error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ flex: 1, p: 3 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Add New University</Typography>
                <Box sx={{ display: { md: 'flex', xs: 'none' }, justifyContent: 'center', alignItems: 'center', gap: 1, mr: 5 }}>
                    <Box
                        component='img'
                        src={ProfileIcon}
                        width={40}
                        height={40}
                        sx={{ cursor: 'pointer' }}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ color: 'black', fontWeight: 600, fontSize: 16 }}>
                            {userName}
                        </Typography>
                        <Typography sx={{ color: '#757575', fontWeight: 600, fontSize: 12 }}>
                            WELCOME
                        </Typography>
                    </Box>
                    <Box component='img' src={Logout} width={20} height={20} sx={{cursor: 'pointer', ml: 1}} onClick={() => {
                        navigate("/")
                    }}/>
                </Box>
            </Box>

            <Box sx={{
                p: 3,
                backgroundColor: '#F9FAFB',
                borderRadius: '8px',
            }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Form fields remain the same */}
                    <Box sx={{ display: 'flex', gap: 3 }}>
                        {/* Left side form fields */}
                        <Box sx={{ flex: 1 }}>
                            <Controller
                                name="universityName"
                                control={control}
                                rules={{
                                    required: 'University name is required',
                                    minLength: {
                                        value: 3,
                                        message: 'University name must be at least 3 characters'
                                    }
                                }}
                                render={({ field }) => (
                                    <StyledTextField
                                        {...field}
                                        fullWidth
                                        label="University Name"
                                        variant="outlined"
                                        error={!!errors.universityName}
                                        helperText={errors.universityName?.message}
                                        sx={{ mb: 2 }}
                                    />
                                )}
                            />

                            <Controller
                                name="websiteUrl"
                                control={control}
                                rules={{
                                    required: 'Website URL is required',

                                }}
                                render={({ field }) => (
                                    <StyledTextField
                                        {...field}
                                        fullWidth
                                        label="University Website URL"
                                        variant="outlined"
                                        error={!!errors.websiteUrl}
                                        helperText={errors.websiteUrl?.message}
                                        sx={{ mb: 2 }}
                                    />
                                )}
                            />

                            <Controller
                                name="description"
                                control={control}
                                rules={{
                                    required: 'Description is required',

                                }}
                                render={({ field }) => (
                                    <StyledTextField
                                        {...field}
                                        fullWidth
                                        label="Short Description about University"
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                        error={!!errors.description}
                                        helperText={errors.description?.message}
                                    />
                                )}
                            />
                        </Box>

                        {/* Right side logo upload */}
                        <Box
                            sx={{
                                width: '365px',
                                height: '192px',
                                borderRadius: '8px',
                                display: 'flex',
                                flexDirection: 'column',
                                backgroundColor: '#ffffff',
                                padding: '10px'
                            }}
                        >
                            <Typography variant="body2" sx={{ marginBottom: '8px', width: '100%', textAlign: 'start', color: '#757575' }}>
                                University Logo
                            </Typography>
                            <IconButton
                                color="primary"
                                component="label"
                                sx={{
                                    width: '100%',
                                    height: '86px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                {previewUrl ? (
                                    <img
                                        src={previewUrl}
                                        alt="logo preview"
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '86px',
                                            objectFit: 'contain'
                                        }}
                                    />
                                ) : (
                                    <img
                                        src={uploadIcon}
                                        alt="upload icon"
                                        style={{
                                            width: '96px',
                                            height: '86px'
                                        }}
                                    />
                                )}
                                <input
                                    hidden
                                    accept="image/jpeg,image/png,image/gif"
                                    type="file"
                                    onChange={handleLogoChange}
                                />
                            </IconButton>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                width: '100%',
                                justifyContent: 'flex-end',
                                alignSelf: 'end',
                            }}>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    sx={{
                                        marginTop: '8px',
                                        borderRadius: '100px',
                                        borderWidth: '1px',
                                        borderColor: '#757575',
                                        borderStyle: 'dashed',
                                        '&:hover': {
                                            borderColor: '#757575',
                                        },
                                        color: '#757575',
                                        fontSize: '12px'
                                    }}
                                >
                                    Upload Images
                                    <input
                                        hidden
                                        accept="image/jpeg,image/png,image/gif"
                                        type="file"
                                        onChange={handleLogoChange}
                                    />
                                </Button>
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            sx={{
                                bgcolor: '#C19AC9',
                                '&:hover': {
                                    bgcolor: '#C19AD1'
                                },
                                width: '365px'
                            }}
                        >
                            {loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                'Add University'
                            )}
                        </Button>
                    </Box>
                </form>
            </Box>

            {/* Notification */}
            <Snackbar
                open={notification.open}
                autoHideDuration={6000}
                onClose={handleCloseNotification}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseNotification}
                    severity={notification.severity}
                    sx={{ width: '100%' }}
                >
                    {notification.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AddUniversity;