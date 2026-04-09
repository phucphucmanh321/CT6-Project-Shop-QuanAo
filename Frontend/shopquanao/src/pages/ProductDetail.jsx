import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Alert, Spinner, Button, Toast } from 'react-bootstrap';
import { FaArrowLeft, FaShoppingCart, FaHeart, FaCheck } from 'react-icons/fa';
import productsAPI from '../services/productsAPI';
import { useCart } from '../contexts/CartContext';
import '../styles/ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        
        // First try to get specific product
        let product = null;
        try {
          product = await productsAPI.getProductById(id);
        } catch (err) {
          // If specific API fails, get all and find by id
          const allData = await productsAPI.getAllProducts();
          let allProducts = [];
          
          if (Array.isArray(allData)) {
            allProducts = allData;
          } else if (allData && allData.results && Array.isArray(allData.results)) {
            allProducts = allData.results;
          } else if (allData && typeof allData === 'object') {
            allProducts = Object.values(allData).filter(item => typeof item === 'object');
          }
          
          product = allProducts.find(p => p.id == id);
        }
        
        if (!product) {
          throw new Error('Không tìm thấy sản phẩm');
        }
        
        setProduct(product);
        setError(null);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.message || 'Không thể tải thông tin sản phẩm.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    try {
      addToCart(product, quantity);
      setShowToast(true);
      
      // Tự động ẩn toast sau 3 giây
      setTimeout(() => setShowToast(false), 3000);
      
      // Tuỳ chọn: Chuyển hướng đến giỏ hàng sau 2 giây
      setTimeout(() => {
        navigate('/cart');
      }, 2000);
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng!');
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  if (loading) {
    return (
      <section className="product-detail-page">
        <Container className="text-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </Spinner>
        </Container>
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="product-detail-page">
        <Container className="py-5">
          <Link to="/categories" className="back-link mb-4">
            <FaArrowLeft className="me-2" />
            Quay lại danh mục
          </Link>
          <Alert variant="danger">
            {error || 'Không tìm thấy sản phẩm'}
          </Alert>
        </Container>
      </section>
    );
  }

  return (
    <section className="product-detail-page">
      {/* Success Toast */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        className="toast-success"
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 9999
        }}
      >
        <Toast.Header closeButton={false} className="bg-success text-white">
          <FaCheck className="me-2" />
          <strong className="me-auto">Thành Công</strong>
        </Toast.Header>
        <Toast.Body className="bg-light">
          ✓ Đã thêm {quantity} sản phẩm vào giỏ hàng!
          <br />
          <small className="text-muted">Chuyển hướng tới giỏ hàng...</small>
        </Toast.Body>
      </Toast>

      <Container className="py-5">
        {/* Back Button */}
        <Link to="/categories" className="back-link mb-4 d-inline-block">
          <FaArrowLeft className="me-2" />
          Quay lại danh mục
        </Link>

        <Row className="mt-4">
          {/* Product Image */}
          <Col lg={6} className="mb-4">
            <div className="product-detail-image">
              {product.image ? (
                <img src={product.image} alt={product.name} className="img-fluid" />
              ) : (
                <div className="product-image-placeholder">Ảnh Sản Phẩm</div>
              )}
            </div>
          </Col>

          {/* Product Info */}
          <Col lg={6}>
            <div className="product-info">
              {product.category && (
                <span className="category-badge">{product.category}</span>
              )}
              
              <h1 className="product-name">{product.name}</h1>

              {/* Rating/Reviews - Optional */}
              <div className="product-rating mb-3">
                <span className="rating-stars">⭐⭐⭐⭐⭐</span>
                <span className="review-count">(45 đánh giá)</span>
              </div>

              {/* Price */}
              <div className="product-price mb-4">
                <span className="current-price">
                  {product.price ? `${product.price.toLocaleString('vi-VN')}₫` : 'Liên hệ'}
                </span>
              </div>

              {/* Description */}
              {product.description && (
                <div className="product-description mb-4">
                  <h5>Mô Tả Sản Phẩm</h5>
                  <p>{product.description}</p>
                </div>
              )}

              {/* Product Details */}
              <div className="product-specs mb-4">
                <h5>Thông Tin Chi Tiết</h5>
                <ul>
                  {product.color && <li><strong>Màu sắc:</strong> {product.color}</li>}
                  {product.size && <li><strong>Kích cỡ:</strong> {product.size}</li>}
                  {product.material && <li><strong>Chất liệu:</strong> {product.material}</li>}
                  {product.stock !== undefined && <li><strong>Kho hàng:</strong> {product.stock > 0 ? 'Còn hàng' : 'Hết hàng'}</li>}
                </ul>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="product-actions mb-4">
                <div className="quantity-selector me-3">
                  <label htmlFor="quantity" className="me-2">Số lượng:</label>
                  <select 
                    id="quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="form-select"
                  >
                    {[1, 2, 3, 4, 5, 10, 15, 20].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <div className="product-buttons">
                <Button 
                  variant="primary" 
                  size="lg"
                  className="me-3 add-to-cart-btn"
                  onClick={handleAddToCart}
                >
                  <FaShoppingCart className="me-2" />
                  Thêm Vào Giỏ Hàng
                </Button>
                <Button 
                  variant="outline-danger" 
                  size="lg"
                  className="wishlist-btn"
                >
                  <FaHeart className="me-2" />
                  Yêu Thích
                </Button>
              </div>

              {/* Shipping Info */}
              <div className="shipping-info mt-5 pt-4 border-top">
                <h6>📦 Chính Sách Giao Hàng</h6>
                <ul>
                  <li>Miễn phí giao hàng cho đơn từ 500.000₫</li>
                  <li>Giao hàng trong 2-3 ngày làm việc</li>
                  <li>Đổi trả miễn phí trong 30 ngày</li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>

        {/* Related Products Section - Optional */}
        <Row className="mt-5 pt-5 border-top">
          <Col>
            <h4 className="mb-4">Sản Phẩm Liên Quan</h4>
            <p className="text-muted">Tương tự sẽ hiển thị ở đây...</p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
