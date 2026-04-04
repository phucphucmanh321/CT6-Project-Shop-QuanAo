import { Container, Row, Col, Card } from 'react-bootstrap';
import '../styles/Products.css';

const productList = [
  {
    id: 1,
    name: 'Áo Sơ Mi Nam',
    price: '199,000₫',
    color: '#3b82f6'
  },
  {
    id: 2,
    name: 'Quần Jeans Slim',
    price: '349,000₫',
    color: '#1e40af'
  },
  {
    id: 3,
    name: 'Váy Chữ A',
    price: '299,000₫',
    color: '#ec4899'
  },
  {
    id: 4,
    name: 'Áo Phông Nữ',
    price: '149,000₫',
    color: '#f97316'
  },
  {
    id: 5,
    name: 'Đầm Dạo Phố',
    price: '599,000₫',
    color: '#a855f7'
  },
  {
    id: 6,
    name: 'Áo Khoác Denim',
    price: '499,000₫',
    color: '#06b6d4'
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
                <div className="product-image" style={{backgroundColor: product.color}}>
                  <svg viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg" className="product-svg">
                    <defs>
                      <linearGradient id={`productGradient${product.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor: product.color, stopOpacity: 1}} />
                        <stop offset="100%" style={{stopColor: product.color, stopOpacity: 0.8}} />
                      </linearGradient>
                    </defs>
                    <rect width="250" height="250" fill={`url(#productGradient${product.id})`} />
                    <circle cx="80" cy="80" r="60" fill="rgba(255,255,255,0.2)" />
                    <circle cx="180" cy="180" r="50" fill="rgba(255,255,255,0.15)" />
                    <text x="125" y="130" textAnchor="middle" fontSize="32" fill="white" fontWeight="bold">
                      👔
                    </text>
                  </svg>
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
