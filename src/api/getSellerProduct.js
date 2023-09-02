import { useState, useEffect} from "react";
import { APIService } from "../axios/client";

export const useGetSellerProduct = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const fetchSellerProduct = async () => {
        try {
            const response = await APIService.get("/seller/product");
            setProducts(response.data.products);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching seller product:", error);
        }
    };

    useEffect(() => {
        fetchSellerProduct();
    }, []);

    return {products, isLoading, fetchSellerProduct};
}