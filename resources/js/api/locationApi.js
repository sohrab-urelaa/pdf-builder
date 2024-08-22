export const getCountryList = async (body) => {
    try {
        const res = await axios.get(`/storage/location/country.json`);
        return res?.data;
    } catch (err) {
        return err?.response?.data;
    }
};

export const getTimeZoneList = async (body) => {
    try {
        const res = await axios.get(`/storage/location/timezone.json`);
        return res?.data;
    } catch (err) {
        return err?.response?.data;
    }
};
