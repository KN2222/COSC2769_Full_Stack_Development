import { useState, useEffect} from "react";
import { APIService } from "../axios/client";
// import { useToastContext } from "../store/toastContext";

export const useGetSellerByID = () => {
  const [status, setStatus] = useState();
  // const [isLoading, setLoading] = useState(true);

  const fetchSellerStatus = async () => {
    try {
      const response = await APIService.get("/seller/profile");
      setStatus(response.data.seller.status);
      // setLoading(false);
    } catch (error) {
      console.error("Error fetching seller tree:", error);
    }
  };

  useEffect(() => {
    fetchSellerStatus();
  }, []);

  return {status, fetchSellerStatus};
}
