import { useCallback, useEffect, useState } from "react";
import { APIService } from "../axios/client";

export const useGetAllSeller = () => {
    const [sellers, setSellers] = useState(null);
    const [count, setCount] = useState(0);
    const [refreshSignal, setRefreshSignal] = useState(0);
    const [isLoading, setLoading] = useState(true);

    const fetchAllSeller = useCallback(async () => {
        try {
            const response = await APIService.get("/admin/seller");
            console.log("response", response);
            setSellers(response.data.sellers);
            setCount(response.data.count);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching seller tree:", error);
        }
    },[]);

    useEffect(() => {
        fetchAllSeller();
    }, [fetchAllSeller, refreshSignal]);

    useEffect(() => {
        if (refreshSignal > 0) {
            fetchAllSeller();
        }
    }, [refreshSignal, fetchAllSeller]);

    const refreshSellers = useCallback(() => {
        console.log("refreshSellers");
        setRefreshSignal((prevSignal) => prevSignal + 1);
    }, []);

    return { sellers, count, fetchAllSeller, refreshSellers, isLoading };
}