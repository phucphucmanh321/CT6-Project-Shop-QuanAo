import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Products from '../components/Products';
import productsAPI from '../services/productsAPI';
import mockProducts from '../services/mockProductsData';
import '../index.css';

const HomePage = () => {
  const { user, isAuthenticated } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await productsAPI.getProducts(1, 20);
        if (response && response.success && response.data) {
          setProducts(response.data);
        } else if (Array.isArray(response)) {
          setProducts(response);
        } else {
          setProducts(mockProducts);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setProducts(mockProducts);
        setError('Không thể kết nối API, sử dụng dữ liệu tạm');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Pick a hero image from first product or fallback
  const heroImage = products && products[0] && products[0].image ? products[0].image : '/src/assets/images/products/product-1-big-ss-long-tee-black.jpg';

  return (
    <main>
      {/* Header space handled by site header component */}

      {/* Hero */}
      <section className="hero-full">
        <div
          className="hero-image"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="hero-overlay">
            <h1 className="hero-title">Bộ sưu tập mới</h1>
            <p className="hero-sub">Sang trọng · Tối giản · Bền vững</p>
            <div>
              <button className="btn btn-custom me-3" onClick={() => navigate('/categories')}>MUA NGAY</button>
              <button className="btn btn-custom btn-outline" onClick={() => navigate('/product/1')}>XEM THÊM</button>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome */}
      {isAuthenticated && user && (
        <section className="container mt-4">
          <div className="bg-white p-3">
            <strong>Chào mừng, {user.name}</strong>
          </div>
        </section>
      )}

      {/* Products */}
      <Products />

      {/* CTA */}
      {!isAuthenticated && (
        <section className="cta-section">
          <div className="container">
            <h3 className="mb-2">Bắt đầu mua sắm ngay</h3>
            <p className="mb-3 text-muted">Đăng nhập để nhận ưu đãi độc quyền</p>
            <div>
              <button className="btn btn-custom me-3" onClick={() => navigate('/login')}>Đăng Nhập</button>
              <button className="btn btn-custom" onClick={() => navigate('/register')}>Đăng Ký</button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default HomePage;
