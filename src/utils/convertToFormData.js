const convertToFormData = (data) => {
    const formData = new FormData();

    const appendData = (key, value) => {
        if (Array.isArray(value)) {
            const isFileArray = value.every(item => item instanceof File);

            if (isFileArray) {
                // If it's an array of files, append each file individually
                value.forEach(file => {
                    formData.append(key, file);
                });
            } else {
                formData.append(key, JSON.stringify(value));
            }
        } else {
            formData.append(key, value);
        }
    };

    for (const [key, value] of Object.entries(data)) {
        appendData(key, value);
    }

    return formData;
};

export default convertToFormData;
