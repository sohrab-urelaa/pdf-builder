import axios from "axios";
export const updateEmailTemplate = async (id, bodyData) => {
    try {
        const data = await axios.put(
            `/admin/edit-email-templates/${id}`,
            bodyData
        );
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};

export const sendBulkEmail = async (bodyData) => {
    try {
        const data = await axios.post(`/admin/bulk-emailing/`, bodyData);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};

export const createUserMailTemplate = async (id, bodyData) => {
    try {
        const data = await axios.post(
            `/settings/email-templates/${id}`,
            bodyData
        );
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};

export const deleteUserEmailTemplate = async (id) => {
    try {
        const data = await axios.delete(`/settings/email-templates/${id}`);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};
