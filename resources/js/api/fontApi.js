import axios from "axios";
export const createnewFont = async (bodyData) => {
    try {
        const data = await axios.post("/admin/font", bodyData);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};
export const updateFont = async (id, bodyData) => {
    try {
        const data = await axios.post(`/admin/font-update/${id}`, bodyData);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};

export const deleteFont = async (id) => {
    try {
        const data = await axios.delete(`/admin/font/${id}`);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};
