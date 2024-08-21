import axios from "axios";
export const createNewPaypal = async (bodyData) => {
    try {
        const data = await axios.post("/admin/paypal", bodyData);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};
export const editPaypal = async (id, bodyData) => {
    try {
        const data = await axios.post(`/admin/paypal-update/${id}`, bodyData);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};

export const deletePaypal = async (id) => {
    try {
        const data = await axios.delete(`/admin/paypal/${id}`);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};
