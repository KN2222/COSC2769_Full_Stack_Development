import React from "react";
import { Container, Col, Row } from "react-bootstrap";

export const SaleBanner = () => {
  return (
    <Container>
      <Row>
        <Col sm={8}>
          <img
            src="https://cf.shopee.vn/file/vn-50009109-a0b92929511e2428e768d3c23b9e1018_xxhdpi"
            alt="banner"
            className="col-12"
            style={{ height: "20rem" }}
          />
        </Col>
        <Col sm={4} >
          <Row>
            <Col className="mb-1">
              <img
                src="https://cf.shopee.vn/file/vn-50009109-e8bee97d5fb118c56292f6e8bedcca44_xhdpi"
                alt="banner"
                className="col-12"
                style={{ height: "10rem" }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <img
                src="https://cf.shopee.vn/file/vn-50009109-e8bee97d5fb118c56292f6e8bedcca44_xhdpi"
                alt="banner"
                className="col-12"
                style={{ height: "10rem" }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
