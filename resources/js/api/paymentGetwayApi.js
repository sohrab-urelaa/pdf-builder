import axios from "axios";
export const createPaymentGetway = async (bodyData) => {
    try {
        const data = await axios.post("/admin/payment-getway", bodyData);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};
export const editPaymentGetway = async (id, bodyData) => {
    try {
        const data = await axios.post(
            `/admin/payment-getway-update/${id}`,
            bodyData
        );
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};

export const deletePaymentGetway = async (id) => {
    try {
        const data = await axios.delete(`/admin/payment-getway/${id}`);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};
