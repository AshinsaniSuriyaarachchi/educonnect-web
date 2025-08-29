import './App.css'
import Home from "./pages/Home.jsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import React from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import MainLayout from "./layouts/MainLayout.jsx";
import ContactUs from "./components/ContactUs.jsx";
import theme from "./theme.js";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Universities from "./pages/Universities.jsx";
import Courses from "./pages/Courses.jsx";
import Profile from "./pages/Profile.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" replace />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/sign-up" element={<SignUp />} />
                        <Route path="/admin/dashboard" element={<AdminDashboard />} />
                        <Route path="/home" element={<MainLayout />}>
                            <Route index element={<Home />} />
                            <Route path="universities" element={<Universities />} />
                            <Route path="courses" element={<Courses />} />
                            <Route path="contact-us" element={<ContactUs />} />
                            <Route path="profile" element={<Profile />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
            <ToastContainer position="bottom-right" stacked />
        </>
    );
}

export default App;