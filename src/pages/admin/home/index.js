import { Col, Container, Row } from "react-bootstrap";
import { SellerStatsCard } from "../../../components/stats/SellerStatsCard";
import { CategoryStatsCard } from "../../../components/stats/CategoryStatsCard";

export const AdminHomePage = () => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col className="col-6">
          <SellerStatsCard />
        </Col>
        <Col className="col-6">
          <CategoryStatsCard />
        </Col>
      </Row>
    </Container>
  );
};
