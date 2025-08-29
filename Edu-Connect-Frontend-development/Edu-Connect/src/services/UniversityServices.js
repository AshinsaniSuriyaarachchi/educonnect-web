import axios from "axios";


const axiosInstance = axios.create({
    baseURL: `http://localhost:8080/university`,
});

export const UniversityServices = {
    saveUniversity: async (formData) => {
        try {
            const response = await axiosInstance.post('/save', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to save university';
            throw new Error(errorMessage);
        }
    },

    getUniversities: async () => {
        try {
            const response = await axiosInstance.get('/list');
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch universities');
        }
    },

};
