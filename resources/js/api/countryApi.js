import axios from "axios";
export const createNewCountry = async (bodyData) => {
    try {
        const data = await axios.post("/admin/country", bodyData);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};
export const editCountry = async (id, bodyData) => {
    try {
        const data = await axios.post(`/admin/country-update/${id}`, bodyData);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};

export const deleteCountry = async (id) => {
    try {
        const data = await axios.delete(`/admin/country/${id}`);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};

export const getCountryList = async () => {
    try {
        const data = await axios.get(`/admin/country-json`);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};
