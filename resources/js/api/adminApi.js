import axios from "axios";
export const createFooter = async (bodyData) => {
    try {
        const data = await axios.post("/admin/footer", bodyData);
        return data;
    } catch (err) {
        return err?.response?.data;
    }
};
export const getParentFooters = async () => {
    try {
        const res = await axios.get("/admin/footer-json");
        return res?.data?.data;
    } catch (err) {
        return err?.response?.data;
    }
};

export const deleteParentFooters = async (id) => {
    try {
        const res = await axios.delete(`/admin/footer-parent/${id}`);
        return res?.data;
    } catch (err) {
        return err?.response?.data;
    }
};

export const deleteChildFooters = async (id) => {
    try {
        const res = await axios.delete(`/admin/footer-child/${id}`);
        return res?.data;
    } catch (err) {
        return err?.response?.data;
    }
};

export const saveGeneralSettings = async (body) => {
    try {
        const res = await axios.post(`/admin/general-settings`, body);
        return res?.data;
    } catch (err) {
        return err?.response?.data;
    }
};
