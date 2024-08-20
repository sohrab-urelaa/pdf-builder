import axios from "axios";
export const createNewCompany = async (bodyData) => {
    try {
        const data = await axios.post("/admin/company", bodyData);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};
export const editCompany = async (id, bodyData) => {
    try {
        const data = await axios.post(`/admin/company-update/${id}`, bodyData);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};

export const deleteCompany = async (id) => {
    try {
        const data = await axios.delete(`/admin/company/${id}`);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};

export const assignOwnerIntoCompany = async (bodyData) => {
    try {
        const data = await axios.post(`/admin/company-owner`, bodyData);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};
