import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Products.css';
import productsAPI from '../services/productsAPI';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productsAPI.getAllProducts();
        
        // Handle both array and object responses from API
        let productsList = [];
        if (Array.isArray(data)) {
          productsList = data;
        } else if (data && data.results && Array.isArray(data.results)) {
          productsList = data.results;
        } else if (data && typeof data === 'object') {
          // Convert object to array if needed
          productsList = Object.values(data).filter(item => typeof item === 'object');
        }
        
        setProducts(productsList);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Không thể tải sản phẩm. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="products-section">
        <Container className="text-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </Spinner>
        </Container>
      </section>
    );
  }

  return (
    <section className="products-section">
      <Container>
        <h2 className="section-title text-center mb-5">Sản phẩm nổi bật</h2>
        {error && <Alert variant="danger" className="mb-4">{error}</Alert>}
        {products.length === 0 ? (
          <Alert variant="info">Chưa có sản phẩm nào</Alert>
        ) : (
          <>
            <Row>
              {products.slice(0, 6).map((product) => (
                <Col key={product.id} md={6} lg={4} className="mb-4">
                  <Card className="product-card h-100">
                    <div className="product-image">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="card-img-top" />
                      ) : (
                        <div className="product-placeholder">Ảnh sản phẩm</div>
                      )}
                    </div>
                    <Card.Body className="d-flex flex-column">
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text className="price-text">
                        {product.price ? `${product.price.toLocaleString('vi-VN')}₫` : 'Liên hệ'}
                      </Card.Text>
                      <div className="mt-auto">
                        <Link 
                          to={`/product/${product.id}`}
                          className="btn btn-primary w-100"
                        >
                          Xem chi tiết
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            <Row className="mt-5">
              <Col className="text-center">
                <Link 
                  to="/categories"
                  className="btn btn-primary btn-lg"
                >
                  Xem tất cả sản phẩm
                </Link>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </section>
  );
}
