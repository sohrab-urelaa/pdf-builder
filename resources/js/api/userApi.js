import axios from "axios";
export const upgradeMembership = async (bodyData) => {
    try {
        const data = await axios.post("/settings/subscriptions", bodyData);
        return data;
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
