import axios from "axios";
export const createNewHeader = async (bodyData) => {
    try {
        const data = await axios.post("/admin/header", bodyData);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};
export const updateHeader = async (id, bodyData) => {
    try {
        const data = await axios.post(`/admin/header-update/${id}`, bodyData);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};

export const deleteHeader = async (id) => {
    try {
        const data = await axios.delete(`/admin/header/${id}`);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};

export const createNewSubHeader = async (bodyData) => {
    try {
        const data = await axios.post("/admin/sub-header", bodyData);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};
export const updateSubHeader = async (id, bodyData) => {
    try {
        const data = await axios.post(
            `/admin/sub-header-update/${id}`,
            bodyData
        );
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};

export const deleteSubHeader = async (id) => {
    try {
        const data = await axios.delete(`/admin/sub-header/${id}`);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};

export const getSubHeaders = async (id) => {
    try {
        const data = await axios.get(`/admin/sub-header/${id}`);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};
