import { Container, Spinner, Alert } from 'react-bootstrap';
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
            <div className="product-grid">
              {products.slice(0, 12).map((product) => (
                <article key={product.id} className="product-card">
                  <div className="product-image">
                    {product.image ? (
                      <img src={product.image} alt={product.name} />
                    ) : (
                      <div className="product-placeholder">Ảnh sản phẩm</div>
                    )}
                  </div>
                  <div className="product-meta">
                    <h3 className="product-title">{product.name}</h3>
                    <div className="product-price">{product.price ? `${product.price.toLocaleString('vi-VN')}₫` : 'Liên hệ'}</div>
                    <div className="mt-3">
                      <Link to={`/product/${product.id}`} className="btn btn-custom w-100">Xem chi tiết</Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="text-center mt-5">
              <Link to="/categories" className="btn btn-custom btn-lg">Xem tất cả sản phẩm</Link>
            </div>
          </>
        )}
      </Container>
    </section>
  );
}
