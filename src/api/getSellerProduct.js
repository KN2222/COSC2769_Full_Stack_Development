import { useState, useEffect} from "react";
import { APIService } from "../axios/client";

export const useGetSellerProduct = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const fetchSellerProduct = async () => {
        try {
            const response = await APIService.get("/seller/product");
            setProducts(response.data.productsOfSeller);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching seller product:", error);
        }
    };

    useEffect(() => {
        console.log("in Get Seller Product");
    }, [products]);

    return {products, isLoading, fetchSellerProduct};
}