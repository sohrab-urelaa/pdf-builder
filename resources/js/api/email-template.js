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
