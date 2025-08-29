import axios from "axios";


const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/course",
});

const courseService = {
    // Save a new course
    saveCourse: async (courseDTO) => {
        const apiRequest = {
            courseDTO,
        };
        console.log(apiRequest);
        try {
            const response = await axiosInstance.post('/save', apiRequest);
            return response.data;
        } catch (error) {
            console.error("Error saving course", error);
            throw error;
        }
    },

    // Update an existing course
    updateCourse: async (courseDTO) => {
        const apiRequest = {
            courseDTO,
        };

        try {
            const response = await axiosInstance.put('/update', apiRequest);
            return response.data;
        } catch (error) {
            console.error("Error updating course", error);
            throw error;
        }
    },

    // Delete a course by courseId
    deleteCourse: async (courseId) => {
        try {
            const response = await axiosInstance.delete(`/delete/${courseId}`);
            return response.data;
        } catch (error) {
            console.error("Error deleting course", error);
            throw error;
        }
    },

    // Get course details by courseId
    getCourseById: async (courseId) => {
        try {
            const response = await axiosInstance.get(`/getByCourseId/${courseId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching course by ID", error);
            throw error;
        }
    },

    // Get courses details by userId
    getCoursesByUserId: async (userId) => {
        try {
            const response = await axiosInstance.get(`/getByUserId/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching courses by user ID", error);
            throw error;
        }
    },

    // Get courses by universityId
    getCoursesByUniversityId: async (universityId) => {
        try {
            const response = await axiosInstance.get(`/getByUniversityId/${universityId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching courses by university ID", error);
            throw error;
        }
    },

    // Get all courses
    getAllCourses: async () => {
        try {
            const response = await axiosInstance.get('/getAll');
            return response.data;
        } catch (error) {
            console.error("Error fetching all courses", error);
            throw error;
        }
    },
};

export default courseService;
