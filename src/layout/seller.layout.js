import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Footer } from "../components/footer";
import { useEffect } from "react";
import { useGetSellerByID } from "../api/getSellerByID";

export const SellerLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { status } = useGetSellerByID();

  useEffect(() => {
    if (location.pathname.includes("/seller") && (status === "Pending" || status === "Rejected")) {
      navigate("/seller/status");
      console.log("status", status);
      console.log("location", location.pathname);
    }
  }, [status, location.pathname]);

  return (
    <div className="vw-100">
      <Outlet />
      <Footer />
    </div>
  );
};