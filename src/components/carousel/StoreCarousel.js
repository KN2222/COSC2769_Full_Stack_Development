import { Card } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { Container } from "react-bootstrap";

export const StoreCarousel = () => {
  return (
    <Carousel controls={false}>
      <Carousel.Item>
        <Container>
          <Card bg={"dark"} text={"light"}>
            <Card.Img
              variant="top"
              src="https://cdn.chotot.com/admincentre/sJ98yDOGX-0zX6fbGtumEXZNxqCRJoerprdrSDDtjSo/preset:raw/plain/c8379fa4fc9ebf6d77a406507a33c034-2842035854600043138.jpg"
            />
          </Card>
        </Container>
      </Carousel.Item>
      <Carousel.Item>
        <Container>
          <Card bg={"dark"} text={"light"}>
            <Card.Img
              variant="top"
              src="https://cdn.chotot.com/admincentre/izh_qOUbMaP8tJhiiHZ3Mnq22hmxvrQYbZBZVhRcHcw/preset:raw/plain/d90486150f142dd86bdc2300968d1cf3-2839693559620122419.jpg"
            />
          </Card>
        </Container>
      </Carousel.Item>
      <Carousel.Item>
        <Container>
          <Card bg={"dark"} text={"light"}>
            <Card.Img
              variant="top"
              src="https://cdn.chotot.com/admincentre/sJ98yDOGX-0zX6fbGtumEXZNxqCRJoerprdrSDDtjSo/preset:raw/plain/c8379fa4fc9ebf6d77a406507a33c034-2842035854600043138.jpg"
            />
          </Card>
        </Container>
      </Carousel.Item>
    </Carousel>
  );
};
