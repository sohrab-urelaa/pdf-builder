import { useEffect } from "react";
import { useState } from "react";
import { getCurrentUserPlans } from "../api/planApi";

const useCurrentPlan = () => {
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchPlan = async () => {
            setLoading(true);
            try {
                const result = await getCurrentUserPlans();
                if (result?.success) {
                    setPlan(result?.data);
                }
            } catch (err) {
            } finally {
                setLoading(false);
            }
        };
        fetchPlan();
    }, []);
    return { plan, loading };
};

export default useCurrentPlan;
