import axios from "axios";
export const createSmtpConfig = async (bodyData) => {
    try {
        const data = await axios.post(`/admin/smtp-config`, bodyData);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};
export const updateSmtpConfig = async (bodyData) => {
    try {
        const data = await axios.put(
            `/admin/smtp-config/${bodyData.id}`,
            bodyData
        );
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};
