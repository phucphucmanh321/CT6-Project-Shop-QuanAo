import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SearchFilter from '../components/SearchFilter';
import productsAPI from '../services/productsAPI';
import '../styles/Categories.css';

export default function Categories() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Initial load - fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productsAPI.getAllProducts();
        
        let productsList = [];
        if (Array.isArray(data)) {
          productsList = data;
        } else if (data && data.results && Array.isArray(data.results)) {
          productsList = data.results;
        } else if (data && typeof data === 'object') {
          productsList = Object.values(data).filter(item => typeof item === 'object');
        }
        
        setProducts(productsList);
        setFilteredProducts(productsList);
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

  // Handle search
  const handleSearch = async (searchQuery) => {
    try {
      setLoading(true);
      const data = await productsAPI.searchProducts(searchQuery);
      
      let productsList = [];
      if (Array.isArray(data)) {
        productsList = data;
      } else if (data && data.results && Array.isArray(data.results)) {
        productsList = data.results;
      } else if (data && typeof data === 'object') {
        productsList = Object.values(data).filter(item => typeof item === 'object');
      }
      
      setProducts(productsList);
      setFilteredProducts(productsList);
      setSelectedCategory('all');
    } catch (err) {
      console.error('Search error:', err);
      setError('Tìm kiếm thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  // Handle price filter
  const handleFilter = async (filterOptions) => {
    try {
      setLoading(true);
      const data = await productsAPI.filterByPrice(filterOptions.minPrice, filterOptions.maxPrice);
      
      let productsList = [];
      if (Array.isArray(data)) {
        productsList = data;
      } else if (data && data.results && Array.isArray(data.results)) {
        productsList = data.results;
      } else if (data && typeof data === 'object') {
        productsList = Object.values(data).filter(item => typeof item === 'object');
      }
      
      setProducts(productsList);
      setFilteredProducts(productsList);
      setSelectedCategory('all');
    } catch (err) {
      console.error('Filter error:', err);
      setError('Lọc sản phẩm thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories from products
  const categories = ['all', ...new Set(products.map(p => p.category || 'Khác'))];

  // Filter by category
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => (p.category || 'Khác') === selectedCategory));
    }
  }, [selectedCategory, products]);

  if (loading && products.length === 0) {
    return (
      <section className="categories-page">
        <Container className="text-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </Spinner>
        </Container>
      </section>
    );
  }

  return (
    <section className="categories-page">
      {/* Search and Filter */}
      <SearchFilter 
        onSearch={handleSearch}
        onFilter={handleFilter}
      />

      <Container>
        <h1 className="categories-title mb-5">Danh Mục Sản Phẩm</h1>

        {error && <Alert variant="danger" className="mb-4">{error}</Alert>}

        {/* Category Filter */}
        {categories.length > 1 && (
          <div className="category-filter mb-5">
            <div className="filter-buttons">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat === 'all' ? 'Tất Cả Sản Phẩm' : cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <Alert variant="info">Không tìm thấy sản phẩm nào</Alert>
        ) : (
          <>
            <Row>
              {filteredProducts.map((product) => (
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
                      {product.category && (
                        <small className="text-muted mb-2">{product.category}</small>
                      )}
                      <Card.Text className="price-text">
                        {product.price ? `${product.price.toLocaleString('vi-VN')}₫` : 'Liên hệ'}
                      </Card.Text>
                      {product.description && (
                        <Card.Text className="description-text">
                          {product.description.substring(0, 100)}...
                        </Card.Text>
                      )}
                      <div className="mt-auto">
                        <Link 
                          to={`/product/${product.id}`}
                          className="btn btn-primary w-100"
                        >
                          Xem Chi Tiết
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            
            <div className="text-center mt-5 mb-5">
              <p className="text-muted">
                Hiển thị {filteredProducts.length} sản phẩm
              </p>
            </div>
          </>
        )}
      </Container>
    </section>
  );
}
