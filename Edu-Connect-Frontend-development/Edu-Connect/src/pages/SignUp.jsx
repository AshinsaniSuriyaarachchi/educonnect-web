import React, {useState} from 'react';
import {Box, Button, Grid, MenuItem, Select, TextField, Typography} from "@mui/material";
import SignUpImg from '../assets/SignUpImg.png';
import {useNavigate} from "react-router-dom";
import userServices from '../services/userServices';
import {toast} from "react-toastify";

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        userType: ""
    });
    const [selectedType, setSelectedType] = useState("");

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSignUp = async () => {
        if (!formData.userName || !formData.email || !formData.password || !formData.userType) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            const response = await userServices.signUp(formData);
            console.log("Sign up response:", response);

            if (response?.status === "success") {
                toast.success(response.message);
                navigate("/login");
            } else {
                toast.error(response.message || "Sign up failed. Please try again.");
            }
        } catch (error) {
            console.log("Error during sign up:", error);
        }
    };

    return (
        <Grid container sx={{height: '100vh'}}>
            <Grid item xs={12} md={6}
                  sx={{display: 'flex', justifyContent: 'center', position: 'relative', height: '100%'}}>
                <Box sx={{
                    position: 'absolute',
                    width: {sm: '50%', xs: '100%'},
                    height: '103%',
                    backgroundColor: '#C19AC9',
                    left: {sm: '-3%', xs: '-1%'},
                    top: '-3%',
                    zIndex: 1,
                }}/>
                <Box component="img" src={SignUpImg} alt="Excited professional" sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: {lg: 530, sm: 400, xs: '100%'},
                    height: 'auto',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    zIndex: 2,
                    position: 'relative',
                }}/>
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
                        Sign Up Today! Your Path to a Successful Career Begins Here—Explore Universities, Find the Perfect Course, and Start Building Your Future!at.
                    </Typography>
                    <Box component="form" sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Username"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            sx={{backgroundColor: '#FFFFFF'}}
                        />
                        <Select
                            fullWidth
                            displayEmpty
                            value={formData.userType}
                            onChange={(e) => {
                                setSelectedType(e.target.value);
                                setFormData((prev) => ({...prev, userType: e.target.value}));
                            }}
                            renderValue={(selected) => {
                                if (!selected) {
                                    return 'Select Type';
                                }
                                return selected === "STUDENT" ? "Student" : "University";
                            }}
                            sx={{backgroundColor: '#FFFFFF'}}
                        >
                            <MenuItem value="" disabled>Select Type</MenuItem>
                            <MenuItem value="STUDENT">Student</MenuItem>
                            <MenuItem value="UNIVERSITY">University</MenuItem>
                        </Select>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            sx={{backgroundColor: '#FFFFFF'}}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            sx={{backgroundColor: '#FFFFFF'}}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                backgroundColor: '#C19AC9',
                                color: 'white',
                                '&:hover': {backgroundColor: '#A87FB1'},
                                textTransform: 'none',
                                py: 1.5
                            }}
                            onClick={handleSignUp}
                        >
                            Sign Up
                        </Button>
                    </Box>
                    <Box sx={{display: 'flex', mt: 2, gap: 1, justifyContent: 'center'}}>
                        <Typography variant="body2">
                            Already have an account?
                        </Typography>
                        <Typography variant="body2" sx={{color: "#C19AC9", cursor: 'pointer'}}
                                    onClick={() => navigate("/login")}>
                            Sign In
                        </Typography>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default SignUp;
