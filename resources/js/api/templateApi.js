export const createNewTemplate = async (bodyData) => {
    try {
        const data = await axios.post("/pdf-templates", bodyData);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};
export const updatePdfTemplate = async (id, bodyData) => {
    try {
        const data = await axios.put(`/pdf-templates/${id}`, bodyData);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};

export const deleteTemplate = async (id) => {
    try {
        const data = await axios.delete(`/pdf-templates/${id}`);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};
