import axios from "axios";
export const createNewPlan = async (bodyData) => {
    try {
        const data = await axios.post("/admin/plans", bodyData);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};
export const editPlan = async (id, bodyData) => {
    try {
        const data = await axios.post(`/admin/plans-update/${id}`, bodyData);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};

export const deletePlan = async (id) => {
    try {
        const data = await axios.delete(`/admin/plans/${id}`);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};

export const getJSONPlans = async () => {
    try {
        const data = await axios.get(`/admin/plans/json`);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};
