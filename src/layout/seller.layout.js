import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Footer } from "../components/footer";
import { useEffect } from "react";
import { useGetSellerByID } from "../api/getSellerByID";
import { useAuth } from "../store/authContext";

export const SellerLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { status } = useGetSellerByID();
  const { getAuthenticatedUserInfo } = useAuth();
  const userInfo = getAuthenticatedUserInfo();

  useEffect(() => {
    if (location.pathname.includes("/seller") && (status === "Pending" || status === "Rejected")) {
      console.log("status", status);
      console.log("location", location.pathname);
      navigate("/seller/status");
    }else{
      navigate("/seller/home");
    }
  }, [status, location.pathname, navigate]);

  return (
    <div className="vw-100">
      <Outlet />
      <Footer />
    </div>
  );
};
