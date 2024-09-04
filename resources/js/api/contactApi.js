import axios from "axios";
export const createNewContactUs = async (bodyData) => {
    try {
        const data = await axios.post("/contact", bodyData);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};
export const deleteContactUs = async (id) => {
    try {
        const data = await axios.delete(`/admin/contact-us/${id}`);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};
