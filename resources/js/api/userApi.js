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
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};
export const updateCertificate = async (id, bodyData) => {
    try {
        const data = await axios.post(
            `/settings/update-certificate/${id}`,
            bodyData
        );
        return data.data;
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

export const getSiteNavs = async () => {
    try {
        const res = await axios.get("/site-navs");
        return res.data;
    } catch (err) {
        return err?.response?.data;
    }
};

export const createNewUser = async (bodyData) => {
    try {
        const data = await axios.post("/users", bodyData);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};
export const updateExistingUser = async (id, bodyData) => {
    try {
        const data = await axios.post(`/users-update/${id}`, bodyData);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};

export const deleteUser = async (id) => {
    try {
        const data = await axios.delete(`/users/${id}`);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};

export const sendVerificationCode = async () => {
    try {
        const data = await axios.post(`/users/send-verification-code`);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};
export const verifyAccount = async (body) => {
    try {
        const data = await axios.post(`/users/verify-account`, body);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};
