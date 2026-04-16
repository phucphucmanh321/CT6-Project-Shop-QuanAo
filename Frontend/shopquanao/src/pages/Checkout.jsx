import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Checkout.css';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, getSubtotal, getShippingFee, getTax, getGrandTotal, clearCart } = useCart();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    shippingMethod: 'standard',
    paymentMethod: 'credit-card',
    terms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (cart.length === 0) {
    return (
      <section className="checkout-page">
        <Container className="py-5">
          <Link to="/categories" className="back-link mb-4 d-inline-block">
            <FaArrowLeft className="me-2" />
            Quay Lại
          </Link>
          
            <Alert variant="warning">
            <h5>Giỏ hàng của bạn trống!</h5>
            <p>Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.</p>
            <Link to="/categories" className="btn btn-custom btn-sm mt-2">
              Tiếp Tục Mua Sắm
            </Link>
          </Alert>
        </Container>
      </section>
    );
  }

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ và tên';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^\d{10,11}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ (10-11 chữ số)';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Vui lòng nhập địa chỉ';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'Vui lòng chọn thành phố/tỉnh';
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Vui lòng nhập mã bưu điện';
    }

    if (!formData.terms) {
      newErrors.terms = 'Vui lòng chấp nhận điều khoản và điều kiện';
    }

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call to place order
    try {
      // In a real app, you would send order data to your backend here
      console.log('Order Data:', {
        shippingInfo: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode
        },
        shippingMethod: formData.shippingMethod,
        paymentMethod: formData.paymentMethod,
        items: cart,
        total: getGrandTotal()
      });

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSubmitted(true);
      clearCart();
      localStorage.removeItem('cart');

      // Redirect to confirmation page after 2 seconds
      setTimeout(() => {
        navigate('/order-confirmation', {
          state: {
            orderData: {
              ...formData,
              items: cart,
              subtotal: getSubtotal(),
              shipping: getShippingFee(),
              tax: getTax(),
              total: getGrandTotal()
            }
          }
        });
      }, 2000);
    } catch (error) {
      console.error('Error placing order:', error);
      setErrors({ submit: 'Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const subtotal = getSubtotal();
  const shipping = getShippingFee();
  const tax = getTax();
  const total = getGrandTotal();

  if (submitted) {
    return (
      <section className="checkout-page">
        <Container className="py-5 text-center">
          <div className="success-animation">
            <div className="success-checkmark">✓</div>
            <h2>Đơn Hàng Được Tạo Thành Công!</h2>
            <p className="mt-3">Đang chuyển hướng đến trang xác nhận...</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <Container className="py-5">
        <Link to="/cart" className="back-link mb-4 d-inline-block">
          <FaArrowLeft className="me-2" />
          Quay Lại Giỏ Hàng
        </Link>

        <h1 className="checkout-title mb-4">💳 Thanh Toán</h1>

        {errors.submit && (
          <Alert variant="danger" dismissible onClose={() => setErrors(prev => ({ ...prev, submit: '' }))}>
            {errors.submit}
          </Alert>
        )}

        <Row className="g-4">
          {/* Checkout Form */}
          <Col lg={8}>
            <Form onSubmit={handleSubmit}>
              {/* Shipping Information */}
              <Card className="mb-4">
                <Card.Header className="bg-light">
                  <h5 className="mb-0">📍 Thông Tin Giao Hàng</h5>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Họ và Tên *</Form.Label>
                        <Form.Control
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          isInvalid={!!errors.fullName}
                          placeholder="Nguyễn Văn A"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.fullName}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Email *</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          isInvalid={!!errors.email}
                          placeholder="email@example.com"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Số Điện Thoại *</Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          isInvalid={!!errors.phone}
                          placeholder="0987654321"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.phone}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Mã Bưu Điện *</Form.Label>
                        <Form.Control
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          isInvalid={!!errors.postalCode}
                          placeholder="10000"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.postalCode}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Địa Chỉ *</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      isInvalid={!!errors.address}
                      placeholder="123 Đường Nguyễn Huệ, Quận 1"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.address}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Thành Phố/Tỉnh *</Form.Label>
                    <Form.Select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      isInvalid={!!errors.city}
                    >
                      <option value="">-- Chọn Thành Phố/Tỉnh --</option>
                      <option value="hanoi">Hà Nội</option>
                      <option value="hcm">TP. Hồ Chí Minh</option>
                      <option value="danang">Đà Nẵng</option>
                      <option value="haiphong">Hải Phòng</option>
                      <option value="cantho">Cần Thơ</option>
                      <option value="other">Tỉnh khác</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.city}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Card.Body>
              </Card>

              {/* Shipping Method */}
              <Card className="mb-4">
                <Card.Header className="bg-light">
                  <h5 className="mb-0">🚚 Phương Thức Giao Hàng</h5>
                </Card.Header>
                <Card.Body>
                  <Form.Group className="mb-2">
                    <Form.Check
                      type="radio"
                      id="standard"
                      name="shippingMethod"
                      value="standard"
                      label="Giao Hàng Thường (3-5 ngày)"
                      checked={formData.shippingMethod === 'standard'}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Check
                      type="radio"
                      id="express"
                      name="shippingMethod"
                      value="express"
                      label="Giao Hàng Nhanh (1-2 ngày) - +20,000₫"
                      checked={formData.shippingMethod === 'express'}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Card.Body>
              </Card>

              {/* Payment Method */}
              <Card className="mb-4">
                <Card.Header className="bg-light">
                  <h5 className="mb-0">💰 Phương Thức Thanh Toán</h5>
                </Card.Header>
                <Card.Body>
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="radio"
                      id="credit"
                      name="paymentMethod"
                      value="credit-card"
                      label="Thẻ Tín Dụng"
                      checked={formData.paymentMethod === 'credit-card'}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="radio"
                      id="bank"
                      name="paymentMethod"
                      value="bank-transfer"
                      label="Chuyển Khoản Ngân Hàng"
                      checked={formData.paymentMethod === 'bank-transfer'}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Check
                      type="radio"
                      id="cod"
                      name="paymentMethod"
                      value="cod"
                      label="Thanh Toán Khi Nhận Hàng (COD)"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Card.Body>
              </Card>

              {/* Terms & Conditions */}
              <Card className="mb-4">
                <Card.Body>
                  <Form.Group>
                    <Form.Check
                      type="checkbox"
                      id="terms"
                      name="terms"
                      label="Tôi đồng ý với điều khoản và điều kiện của cửa hàng *"
                      checked={formData.terms}
                      onChange={handleInputChange}
                      isInvalid={!!errors.terms}
                    />
                    {errors.terms && (
                      <small className="text-danger d-block mt-2">{errors.terms}</small>
                    )}
                  </Form.Group>
                </Card.Body>
              </Card>

              {/* Submit Button */}
              <Button
                variant="danger"
                size="lg"
                className="w-100 checkout-submit"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Đang Xử Lý...' : 'Đặt Hàng'}
              </Button>
            </Form>
          </Col>

          {/* Order Summary Sidebar */}
          <Col lg={4}>
            <Card className="order-summary-card sticky-top" style={{ top: '20px' }}>
              <Card.Header className="bg-light">
                <h5 className="mb-0">📋 Tóm Tắt Đơn Hàng</h5>
              </Card.Header>
              <Card.Body>
                <div className="order-items mb-4">
                  <h6 className="mb-3">Sản Phẩm ({cart.length} mục)</h6>
                  <div className="items-list">
                    {cart.map(item => (
                      <div key={item.id} className="order-item">
                        <span className="item-name">{item.name}</span>
                        <span className="item-qty">x{item.quantity}</span>
                        <span className="item-price">
                          {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="price-breakdown">
                  <div className="price-row">
                    <span>Tạm Tính:</span>
                    <span>{subtotal.toLocaleString('vi-VN')}₫</span>
                  </div>
                  <div className="price-row">
                    <span>Phí Giao Hàng:</span>
                    <span>{shipping === 0 ? 'Miễn phí' : `${shipping.toLocaleString('vi-VN')}₫`}</span>
                  </div>
                  <div className="price-row">
                    <span>Thuế (10%):</span>
                    <span>{tax.toLocaleString('vi-VN')}₫</span>
                  </div>
                  <div className="price-row total">
                    <strong>Tổng Cộng:</strong>
                    <strong className="total-price">{total.toLocaleString('vi-VN')}₫</strong>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
