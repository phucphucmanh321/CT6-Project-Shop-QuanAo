import { Container, Row, Col } from 'react-bootstrap';
import '../styles/Hero.css';

export default function Hero() {
  return (
    <section className="hero-section">
      <Container>
        <Row className="align-items-center py-5">
          <Col lg={6} className="text-section">
            <h1 className="hero-title">Thời Trang Năng Động</h1>
            <p className="hero-subtitle">
              Khám phá bộ sưu tập quần áo mới nhất với phong cách hiện đại và chất lượng cao
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary btn-lg me-3">
                Mua Sắm Ngay
              </button>
              <button className="btn btn-outline-primary btn-lg">
                Xem Bộ Sưu Tập
              </button>
            </div>
          </Col>
          <Col lg={6} className="image-section">
            <div className="hero-image-placeholder">
              <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="hero-svg">
                <defs>
                  <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#667eea', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#764ba2', stopOpacity: 1}} />
                  </linearGradient>
                </defs>
                <rect width="400" height="400" fill="url(#heroGradient)" />
                <circle cx="200" cy="180" r="100" fill="rgba(255,255,255,0.3)" />
                <circle cx="150" cy="250" r="60" fill="rgba(255,255,255,0.2)" />
                <circle cx="280" cy="300" r="80" fill="rgba(255,255,255,0.15)" />
                <text x="200" y="210" textAnchor="middle" fontSize="48" fill="white" fontWeight="bold">
                  👗
                </text>
              </svg>
            </div>
          </Col>
        </Row>
      </Container>
      
      {/* Promotional banner */}
      <div className="promo-banner">
        <Container>
          <Row className="text-center">
            <Col md={4} className="promo-item">
              <h4>� GIAO HÀNG NHANH</h4>
              <p>Miễn phí giao hàng cho đơn từ 500K</p>
            </Col>
            <Col md={4} className="promo-item">
              <h4>� ĐỔI HÀNG DỄ DÀNG</h4>
              <p>Đổi hàng trong 30 ngày không lý do</p>
            </Col>
            <Col md={4} className="promo-item">
              <h4>� HỖ TRỢ 24/7</h4>
              <p>Liên hệ chúng tôi bất kỳ lúc nào</p>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
}
