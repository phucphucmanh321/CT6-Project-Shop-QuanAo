import { Container, Row, Col, Table, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTrash, FaArrowLeft } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import '../styles/Cart.css';

export default function Cart() {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    getSubtotal, 
    getShippingFee, 
    getTax, 
    getGrandTotal 
  } = useCart();

  if (cart.length === 0) {
    return (
      <section className="cart-page">
        <Container className="py-5">
          <Link to="/categories" className="back-link mb-4 d-inline-block">
            <FaArrowLeft className="me-2" />
            Tiếp tục mua sắm
          </Link>
          
            <div className="empty-cart">
            <h2>🛒 Giỏ Hàng Trống</h2>
            <p>Bạn chưa có sản phẩm nào trong giỏ hàng</p>
            <Link to="/categories" className="btn btn-custom btn-lg mt-4">
              Khám Phá Sản Phẩm
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  const subtotal = getSubtotal();
  const shipping = getShippingFee();
  const tax = getTax();
  const total = getGrandTotal();

  return (
    <section className="cart-page">
      <Container className="py-5">
        <Link to="/categories" className="back-link mb-4 d-inline-block">
          <FaArrowLeft className="me-2" />
          Tiếp tục mua sắm
        </Link>

        <h1 className="cart-title mb-4">🛒 Giỏ Hàng Của Bạn</h1>

        <Row className="g-4">
          {/* Cart Items */}
          <Col lg={8}>
            <div className="cart-items">
              <Table striped hover className="cart-table">
                <thead>
                  <tr>
                    <th>Sản Phẩm</th>
                    <th>Giá</th>
                    <th>Số Lượng</th>
                    <th>Tổng Cộng</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => (
                    <tr key={item.id} className="cart-item">
                      <td>
                        <div className="product-info">
                          <div className="product-image-small">
                            {item.image ? (
                              <img src={item.image} alt={item.name} />
                            ) : (
                              <div className="placeholder-image">No Image</div>
                            )}
                          </div>
                          <div className="product-details">
                            <h6>{item.name}</h6>
                            <small className="text-muted">{item.category}</small>
                          </div>
                        </div>
                      </td>
                      <td className="price-cell">
                        {item.price.toLocaleString('vi-VN')}₫
                      </td>
                      <td className="quantity-cell">
                        <div className="quantity-input">
                          <button 
                            className="qty-btn"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <input 
                            type="number" 
                            value={item.quantity}
                            onChange={(e) => {
                              const qty = parseInt(e.target.value) || 1;
                              updateQuantity(item.id, Math.max(1, qty));
                            }}
                            min="1"
                          />
                          <button 
                            className="qty-btn"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="total-cell">
                        <strong>
                          {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                        </strong>
                      </td>
                      <td className="action-cell">
                        <button 
                          className="btn-delete"
                          onClick={() => removeFromCart(item.id)}
                          title="Xóa sản phẩm"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>

          {/* Order Summary */}
          <Col lg={4}>
            <div className="order-summary">
              <h4 className="mb-4">📋 Tóm Tắt Đơn Hàng</h4>

              <div className="summary-row">
                <span>Tạm Tính:</span>
                <span className="amount">{subtotal.toLocaleString('vi-VN')}₫</span>
              </div>

              <div className="summary-row">
                <span>Phí Giao Hàng:</span>
                <span className="amount">
                  {shipping === 0 ? (
                    <span className="free">Miễn phí</span>
                  ) : (
                    `${shipping.toLocaleString('vi-VN')}₫`
                  )}
                </span>
              </div>

              <div className="summary-row">
                <span>Thuế (10%):</span>
                <span className="amount">{tax.toLocaleString('vi-VN')}₫</span>
              </div>

              {shipping === 0 && (
                <Alert variant="success" className="shipping-notice mt-3 mb-3">
                  ✓ Bạn được miễn phí giao hàng!
                </Alert>
              )}

              <div className="summary-row total">
                <strong>Tổng Cộng:</strong>
                <strong className="total-amount">
                  {total.toLocaleString('vi-VN')}₫
                </strong>
              </div>

              <Link 
                to="/checkout"
                className="btn btn-custom w-100 mt-4 checkout-btn"
              >
                Tiến Hành Thanh Toán
              </Link>

              <Link 
                to="/categories"
                className="btn btn-outline-secondary w-100 mt-2"
              >
                Tiếp Tục Mua Sắm
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
