import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/user",
});

const userService = {
    // Sign In
    signIn: async (userDTO) => {
        const apiRequest = {
            userDTO
        };
        console.log(apiRequest);
        try {
            const response = await axiosInstance.post('/sign-in', apiRequest);
            return response.data;
        } catch (error) {
            console.error("Error on sign-in", error);
            throw error;
        }
    },

    // Sign Up
    signUp: async (userDTO) => {
        const apiRequest = {
            userDTO
        };
        console.log(apiRequest);
        try {
            const response = await axiosInstance.post('/sign-up', apiRequest);
            return response.data;
        } catch (error) {
            console.error("Error on sign-up", error);
            throw error;
        }
    },

    // Rate
    rate: async (rateDTO, userId) => {
        const apiRequest = {
            rateDTO,
            userId,
        };
        console.log(apiRequest);
        try {
            const response = await axiosInstance.post('/rate', apiRequest);
            return response.data;
        } catch (error) {
            console.error("Error on rating", error);
            throw error;
        }
    },

    // Save Course
    saveCourse: async (userId, courseId) => {
        const apiRequest = {
            userId,
            courseId
        };
        console.log(apiRequest);
        try {
            const response = await axiosInstance.post('/save-course', apiRequest);
            return response.data;
        } catch (error) {
            console.error("Error on Course Save", error);
            throw error;
        }
    },

    // Get Saved Courses
    getSavedCourses: async (userId) => {
        const apiRequest = {
            userId
        };
        console.log(apiRequest);
        try {
            const response = await axiosInstance.post('/get-saved-courses', apiRequest);
            return response.data;
        } catch (error) {
            console.error("Error on Saved Courses Fetch", error);
            throw error;
        }
    },
};

export default userService;