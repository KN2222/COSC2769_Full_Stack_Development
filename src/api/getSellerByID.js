import { useState, useEffect } from "react";
import { APIService } from "../axios/client";
// import { useToastContext } from "../store/toastContext";

export const useGetSellerByID = () => {
  const [status, setStatus] = useState();

  useEffect(() => {
    const fetchSellerStatus = async () => {
      try {
        const response = await APIService.get("/seller/profile");
        setStatus(response.data.seller.status);
        console.log("response status", response.data.seller.status);
      } catch (error) {
        console.error("Error fetching seller tree:", error);
      }
    };
    fetchSellerStatus();
  }, []);


  return { status };
};
