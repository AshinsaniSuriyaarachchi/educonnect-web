import React, {useState} from 'react';
import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import LoginImg from '../assets/LoginImg.png';
import {useNavigate} from "react-router-dom";
import userServices from "../services/UserServices.js";
import {toast} from "react-toastify";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 4) {
            newErrors.password = 'Password must be at least 4 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const userDTO = {
                email: formData.email,
                password: formData.password
            };

            const response = await userServices.signIn(userDTO);
            console.log("response : ", response);

            if (response?.responseCode === "200") {
                localStorage.setItem("userId", response.user.userId);
                localStorage.setItem("userName", response.user.userName);

                if (response?.user?.userType === "STUDENT") {
                    navigate("/home");
                } else {
                    navigate("/admin/dashboard");
                }
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.log("Error in Login");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Grid container sx={{height: '100vh'}}>
            <Grid item xs={12} md={6}
                  sx={{display: 'flex', justifyContent: 'center', position: 'relative', height: '100%'}}>
                <Box
                    sx={{
                        position: 'absolute',
                        width: {sm: '50%', xs: '100%'},
                        height: '103%',
                        backgroundColor: '#C19AC9',
                        left: {sm: '-3%', xs: '-1%'},
                        top: '-3%',
                        zIndex: 1,
                    }}
                />
                <Box
                    component="img"
                    src={LoginImg}
                    alt="Excited professional"
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: {lg: 530, sm: 400, xs: '100%'},
                        height: 'auto',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        zIndex: 2,
                        position: 'relative',
                    }}
                />
            </Grid>

            <Grid item xs={12} md={6}
                  sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                <Box sx={{
                    backgroundColor: '#F3F3F3',
                    padding: 4,
                    borderRadius: 2,
                    width: '100%',
                    maxWidth: 500,
                    maxHeight: '90vh',
                    overflowY: 'auto',
                }}>
                    <Typography variant="h4" component="h1" align="center" gutterBottom sx={{fontWeight: 'bold'}}>
                        WELCOME
                    </Typography>
                    <Typography variant="body2" align="center" sx={{mb: 3, color: 'text.secondary'}}>
                        Log In to Discover Your Dream Course and University: Get Personalized Guidance and Explore Top
                        Institutions!
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit}
                         sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                        <TextField
                            fullWidth
                            name="email"
                            variant="outlined"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            error={Boolean(errors.email)}
                            helperText={errors.email}
                            sx={{backgroundColor: '#FFFFFF'}}
                        />
                        <TextField
                            fullWidth
                            name="password"
                            variant="outlined"
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            error={Boolean(errors.password)}
                            helperText={errors.password}
                            sx={{backgroundColor: '#FFFFFF'}}
                        />
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            sx={{
                                backgroundColor: '#C19AC9',
                                color: 'white',
                                '&:hover': {backgroundColor: '#A87FB1'},
                                textTransform: 'none',
                                py: 1.5
                            }}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </Box>

                    <Box sx={{display: 'flex', mt: 2, gap: 1, justifyContent: 'center'}}>
                        <Typography variant="body2">
                            Don't have an account?
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{color: "#C19AC9", cursor: 'pointer'}}
                            onClick={() => navigate("/sign-up")}
                        >
                            Sign Up
                        </Typography>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Login;