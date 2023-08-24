import { Outlet } from "react-router-dom";
import { HomeNav } from "../components/navbar/HomeNav";
import { Footer } from "../components/footer";

export const CustomerLayout = () => {
  return (
    <>
      <HomeNav />
      <Outlet />
      <Footer />
    </>
  );
};
