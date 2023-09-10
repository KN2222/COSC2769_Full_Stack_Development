import { Container } from "react-bootstrap";

export const HomeBanner = () => {
  return (
    <Container
      fluid
      style={{
        backgroundColor: "#D649FA",
      }}
      className="d-flex justify-content-center align-items-center
      "
      
    >
      <img
        src="banner.gif"
        alt="banner"
        style={{ width: "65%", height: "5.5rem" }}
      />
    </Container>
  );
};
