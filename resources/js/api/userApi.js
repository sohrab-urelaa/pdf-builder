import axios from "axios";
export const upgradeMembership = async (bodyData) => {
    try {
        const data = await axios.post("/settings/subscriptions", bodyData);
        return data;
    } catch (err) {
        return err?.response?.data;
    }
};
export const createCertificate = async (bodyData) => {
    try {
        const data = await axios.post("/settings/certificate", bodyData);
        return data;
    } catch (err) {
        return err?.response?.data;
    }
};
export const deleteCertificate = async (id) => {
    try {
        const data = await axios.delete(`/settings/certificate/${id}`);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};
export const uploadTemplate = async (bodyData) => {
    try {
        const data = await axios.post("/upload-template", bodyData);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};
export const verifyTemplate = async (bodyData) => {
    try {
        const data = await axios.post("/settings/verify-pdf", bodyData);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};

export const getFooters = async () => {
    try {
        const res = await axios.get("/footers");
        return res.data;
    } catch (err) {
        return err?.response?.data;
    }
};
