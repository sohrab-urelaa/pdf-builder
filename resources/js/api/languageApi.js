import axios from "axios";
export const getSupportedLanguages = async (lng) => {
    try {
        const data = await axios.get(`/admin/language-json`);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};
export const getLanguageJSON = async (lng) => {
    try {
        const data = await axios.get(`/storage/translations/${lng}.json`);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};
export const createNewLanguage = async (formData) => {
    try {
        const data = await axios.post(`/admin/language`, formData);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};

export const updateLanguage = async (formData) => {
    try {
        const data = await axios.post(`/admin/language-update`, formData);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};

export const deleteLanguage = async (id) => {
    try {
        const data = await axios.delete(`/admin/language-delete/${id}`);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};
