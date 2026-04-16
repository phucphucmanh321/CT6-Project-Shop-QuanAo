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
              <button className="btn btn-custom btn-lg me-3">
                Mua Sắm Ngay
              </button>
              <button className="btn btn-outline-primary btn-lg">
                Xem Bộ Sưu Tập
              </button>
            </div>
          </Col>
          <Col lg={6} className="image-section">
            <div className="hero-image-placeholder">
              Ảnh Hero
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
