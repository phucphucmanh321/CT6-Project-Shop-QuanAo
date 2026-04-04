import { Container, Row, Col } from 'react-bootstrap';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer className="footer-section">
      <Container>
        <Row className="py-5">
          <Col md={3} className="footer-col">
            <h5>Về Chúng Tôi</h5>
            <ul className="footer-links">
              <li><a href="#">Giới thiệu</a></li>
              <li><a href="#">Câu chuyện thương hiệu</a></li>
              <li><a href="#">Tin tức</a></li>
              <li><a href="#">Bộ sưu tập</a></li>
              <li><a href="#">Tuyển dụng</a></li>
            </ul>
          </Col>

          <Col md={3} className="footer-col">
            <h5>Chính Sách</h5>
            <ul className="footer-links">
              <li><a href="#">Điều khoản sử dụng</a></li>
              <li><a href="#">Chính sách bảo mật</a></li>
              <li><a href="#">Chính sách vận chuyển</a></li>
              <li><a href="#">Chính sách đổi trả</a></li>
              <li><a href="#">Hướng dẫn bảo vệ quần áo</a></li>
            </ul>
          </Col>

          <Col md={3} className="footer-col">
            <h5>Liên Hệ</h5>
            <div className="contact-info">
              <p><strong>Email:</strong> <a href="mailto:hello@fashionstore.com">hello@fashionstore.com</a></p>
              <p><strong>Điện thoại:</strong> <a href="tel:0366999989">0366 999 989</a></p>
              <p><strong>Giờ làm việc:</strong></p>
              <p>Thứ Hai - Chủ Nhật: 9:00 - 21:00</p>
            </div>
          </Col>

          <Col md={3} className="footer-col">
            <h5>Theo Dõi Chúng Tôi</h5>
            <div className="social-links">
              <a href="#" className="social-link">Facebook</a>
              <a href="#" className="social-link">Instagram</a>
              <a href="#" className="social-link">TikTok</a>
              <a href="#" className="social-link">Pinterest</a>
            </div>
          </Col>
        </Row>

        <hr className="my-4" />

        <Row className="payment-section py-4">
          <Col className="text-center">
            <h6>Hình Thức Thanh Toán</h6>
            <div className="payment-methods">
              <span className="payment-method">💳 Thẻ Tín Dụng</span>
              <span className="payment-method">📱 Ví Điện Tử</span>
              <span className="payment-method">🏦 Chuyển Khoản</span>
              <span className="payment-method">💵 Thanh Toán Khi Nhận</span>
            </div>
          </Col>
        </Row>

        <Row className="copyright">
          <Col className="text-center text-muted">
            <p>Copyright © 2024 Fashion Store | Thiết kế với ❤️ cho bạn</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
