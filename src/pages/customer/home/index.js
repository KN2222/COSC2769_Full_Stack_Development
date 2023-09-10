import { Container, Row } from 'react-bootstrap';
import ProductCard from '../../../components/landingPage/productCard';
import { StoreCarousel } from '../../../components/carousel/StoreCarousel';

export default function Home() {
  return (
    <Container>
      <Row className='my-2'>
        <StoreCarousel />
      </Row>
      <Row className='my-2'>
        <ProductCard />
      </Row>
    </Container>
  );
}
