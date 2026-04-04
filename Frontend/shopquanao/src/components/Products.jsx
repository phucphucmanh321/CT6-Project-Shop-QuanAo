import { Container, Row, Col, Card } from 'react-bootstrap';
import '../styles/Products.css';
import shirtImage from '../assets/images/product-shirt.svg';
import jeansImage from '../assets/images/product-jeans.svg';
import dressImage from '../assets/images/product-dress.svg';
import tshirtImage from '../assets/images/product-tshirt.svg';
import jacketImage from '../assets/images/product-jacket.svg';

const productList = [
  {
    id: 1,
    name: 'Áo Sơ Mi Nam',
    price: '199,000₫',
    image: shirtImage
  },
  {
    id: 2,
    name: 'Quần Jeans Slim',
    price: '349,000₫',
    image: jeansImage
  },
  {
    id: 3,
    name: 'Váy Chữ A',
    price: '299,000₫',
    image: dressImage
  },
  {
    id: 4,
    name: 'Áo Phông Nữ',
    price: '149,000₫',
    image: tshirtImage
  },
  {
    id: 5,
    name: 'Đầm Dạo Phố',
    price: '599,000₫',
    image: dressImage
  },
  {
    id: 6,
    name: 'Áo Khoác Denim',
    price: '499,000₫',
    image: jacketImage
  },
];

export default function Products() {
  return (
    <section className="products-section">
      <Container>
        <h2 className="section-title text-center mb-5">Sản phẩm nổi bật</h2>
        <Row>
          {productList.map((product) => (
            <Col key={product.id} md={6} lg={4} className="mb-4">
              <Card className="product-card h-100">
                <div className="product-image">
                  <img src={product.image} alt={product.name} className="product-svg" />
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text className="price-text">{product.price}</Card.Text>
                  <div className="mt-auto">
                    <button className="btn btn-primary w-100">
                      Xem chi tiết
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Row className="mt-5">
          <Col className="text-center">
            <button className="btn btn-primary btn-lg">
              Xem tất cả sản phẩm
            </button>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
