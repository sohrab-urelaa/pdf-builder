import { useEffect, useState } from "react";
import { getCountryList, getTimeZoneList } from "../api/locationApi";

const useLocatioin = () => {
    const [countryList, setCountryList] = useState([]);
    const [timeZoneList, setTimeZoneList] = useState({});

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const result = await getCountryList();
                setCountryList(result);
            } catch (err) {}
        };
        const fetchTimezone = async () => {
            try {
                const result = await getTimeZoneList();
                setTimeZoneList(result);
            } catch (err) {}
        };
        fetchCountry();
        fetchTimezone();
    }, []);
    return { countryList, timeZoneList };
};

export default useLocatioin;
