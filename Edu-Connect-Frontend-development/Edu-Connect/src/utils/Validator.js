export const Validators = {
    isValidImageType: (file) => {
        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        return file && validTypes.includes(file.type);
    },

    isValidFileSize: (file, maxSizeMB = 5) => {
        return file && file.size <= maxSizeMB * 1024 * 1024;
    }
};