import axios from "axios";
export const createNewMyFatoorah = async (bodyData) => {
    try {
        const data = await axios.post("/admin/my-fatoorah", bodyData);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};
export const editMyFatoorah = async (id, bodyData) => {
    try {
        const data = await axios.post(
            `/admin/my-fatoorah-update/${id}`,
            bodyData
        );
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};

export const deleteMyFatoorah = async (id) => {
    try {
        const data = await axios.delete(`/admin/my-fatoorah/${id}`);
        return data.data;
    } catch (err) {
        return err?.response?.data;
    }
};
