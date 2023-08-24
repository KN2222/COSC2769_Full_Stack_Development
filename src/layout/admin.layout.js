import { Card, Container } from "react-bootstrap";
import { AdminNavbar } from "../components/navbar/AdminNav";
import { Navigate, Outlet } from "react-router-dom";
import { Footer } from "../components/footer";

export const AdminLayout = () => {
  return (
    <div>
      <AdminNavbar />
      <Container className="mb-5">
        <Card bg={"dark"} text={"light"}>
          <Card.Img
            variant="top"
            src="/large-warehouse-with-bright-light-coming-through-door_123827-23506.avif"
            style={{ width: "100%", height: "18rem" }}
          />
          <Card.Body style={{ textAlign: "center" }}>
            <Card.Title>Warehouse</Card.Title>
          </Card.Body>
        </Card>
      </Container>
      <Outlet />
      <Footer/>
    </div>
  );
};
