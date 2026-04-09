import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../styles/SearchFilter.css';

export default function SearchFilter({ onSearch, onFilter }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleFilter = (e) => {
    e.preventDefault();
    onFilter({
      minPrice: minPrice ? parseInt(minPrice) : null,
      maxPrice: maxPrice ? parseInt(maxPrice) : null,
    });
  };

  const handleReset = () => {
    setSearchQuery('');
    setMinPrice('');
    setMaxPrice('');
    onSearch('');
  };

  return (
    <section className="search-filter-section">
      <Container>
        <Row className="gap-4">
          {/* Search Box */}
          <Col lg={6}>
            <Form onSubmit={handleSearch} className="search-form">
              <Form.Group>
                <Form.Label>🔍 Tìm Kiếm Sản Phẩm</Form.Label>
                <div className="search-input-group">
                  <Form.Control
                    type="text"
                    placeholder="Nhập tên sản phẩm (VD: TEE, Áo, Quần...)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  <Button 
                    variant="primary" 
                    type="submit"
                    className="search-btn"
                  >
                    Tìm
                  </Button>
                </div>
              </Form.Group>
            </Form>
          </Col>

          {/* Price Filter */}
          <Col lg={5}>
            <Form onSubmit={handleFilter} className="filter-form">
              <Form.Label>💰 Lọc Theo Giá</Form.Label>
              <div className="price-inputs">
                <Form.Group>
                  <Form.Control
                    type="number"
                    placeholder="Giá từ"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="price-input"
                  />
                </Form.Group>
                <span className="separator">-</span>
                <Form.Group>
                  <Form.Control
                    type="number"
                    placeholder="Giá đến"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="price-input"
                  />
                </Form.Group>
                <Button 
                  variant="secondary" 
                  type="submit"
                  className="filter-btn"
                >
                  Lọc
                </Button>
              </div>
            </Form>
          </Col>
        </Row>

        {/* Reset Button */}
        {(searchQuery || minPrice || maxPrice) && (
          <Row className="mt-3">
            <Col>
              <Button 
                variant="outline-secondary"
                size="sm"
                onClick={handleReset}
                className="reset-btn"
              >
                🔄 Xóa Bộ Lọc
              </Button>
            </Col>
          </Row>
        )}
      </Container>
    </section>
  );
}
