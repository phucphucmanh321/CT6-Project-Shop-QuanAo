# 📁 Hướng Dẫn Cấu Trúc Folder & Kết Nối API

## 1. CẤU TRÚC THƯỤC MỤC HIỆN TẠI

```
shopquanao/
├── public/                    # Static files
├── src/
│   ├── assets/               # Images, fonts, etc
│   │   └── images/products/  # Product images (20 files)
│   ├── components/           # Reusable components
│   │   ├── ErrorBoundary.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── Products.jsx
│   │   ├── Promotions.jsx
│   │   └── SearchFilter.jsx
│   ├── contexts/             # State management
│   │   ├── AuthContext.jsx   # User authentication state
│   │   └── CartContext.jsx   # Shopping cart state
│   ├── pages/                # Page components
│   │   ├── Cart.jsx
│   │   ├── Categories.jsx
│   │   ├── Checkout.jsx
│   │   ├── Login.jsx
│   │   ├── ProductDetail.jsx
│   │   └── Register.jsx
│   ├── services/             # API calls
│   │   ├── authAPI.js        # Login/Register API
│   │   ├── productsAPI.js    # Products API
│   │   └── mockProductsData.js # Mock data
│   ├── styles/               # CSS files
│   │   ├── Auth.css
│   │   ├── Cart.css
│   │   ├── Checkout.css
│   │   └── ...
│   ├── utils/                # Utilities
│   │   └── addDemoAccounts.js
│   ├── App.jsx               # Main app
│   ├── main.jsx              # Entry point
│   └── index.css
├── package.json
└── vite.config.js
```

---

## 2. FLOW KẾT NỐI API

```
User Action (Click)
    ↓
Component (Login.jsx)
    ↓
authAPI.js (API Call)
    ↓
API Server (https://api.lehuuminhquan.id.vn)
    ↓
Response Data
    ↓
AuthContext.jsx (Save to state)
    ↓
localStorage (Save token)
    ↓
Update UI (Header, Pages)
```

---

## 3. CÁCH HOẠT ĐỘNG CHI TIẾT

### 3.1 HOMEPAGE (Trang Chủ)

**File**: `src/pages/HomePage.jsx` (cần tạo mới)

```javascript
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Hero from '../components/Hero';
import Products from '../components/Products';
import Promotions from '../components/Promotions';
import '../styles/Home.css';

const HomePage = () => {
  const { user, isAuthenticated } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy danh sách sản phẩm từ API
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://api.lehuuminhquan.id.vn/products');
        const data = await response.json();
        if (data.success) {
          setProducts(data.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home-page">
      <Hero />
      
      {isAuthenticated && (
        <div className="welcome-banner">
          <p>👋 Chào mừng {user?.name}!</p>
        </div>
      )}

      <Promotions />
      
      {loading ? (
        <div className="loading">Đang tải sản phẩm...</div>
      ) : (
        <Products products={products} />
      )}
    </div>
  );
};

export default HomePage;
```

### 3.2 ĐĂNG NHẬP (Login Page)

**File**: `src/pages/Login.jsx` (sửa lại)

```javascript
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import authAPI from '../services/authAPI';
import '../styles/Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Gọi API đăng nhập
      const response = await authAPI.login({ email, password });
      
      if (response.success) {
        // Lưu user vào context
        login(response.user, response.token);
        
        // Chuyển về trang chủ
        navigate('/');
        
        // Hiển thị thông báo thành công
        console.log('✅ Đăng nhập thành công!');
      } else {
        setError(response.message || 'Đăng nhập thất bại');
      }
    } catch (err) {
      setError('❌ Lỗi kết nối. Vui lòng thử lại.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>🔐 Đăng Nhập</h2>
        
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
              required
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="btn-login">
            {loading ? '⏳ Đang đăng nhập...' : '🔓 Đăng Nhập'}
          </button>
        </form>

        <p className="auth-link">
          Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
        </p>

        {/* Demo Accounts */}
        <div className="demo-accounts">
          <h5>📝 Tài khoản Demo:</h5>
          <p>📧 user1@example.com / 🔑 Password123</p>
          <p>📧 user2@example.com / 🔑 Password456</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
```

### 3.3 ĐĂNG KÝ (Register Page)

**File**: `src/pages/Register.jsx` (sửa lại)

```javascript
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import authAPI from '../services/authAPI';
import '../styles/Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('❌ Mật khẩu không khớp');
      return;
    }

    if (formData.password.length < 6) {
      setError('❌ Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    setLoading(true);

    try {
      // Gọi API đăng ký
      const response = await authAPI.register({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        phone: formData.phone
      });

      if (response.success) {
        // Lưu user vào context
        login(response.user, response.token);
        
        // Chuyển về trang chủ
        navigate('/');
        
        console.log('✅ Đăng ký thành công!');
      } else {
        setError(response.message || 'Đăng ký thất bại');
      }
    } catch (err) {
      setError('❌ Lỗi kết nối. Vui lòng thử lại.');
      console.error('Register error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>📝 Đăng Ký</h2>
        
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Họ và tên</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Nguyễn Văn A"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Số điện thoại</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="0901234567"
              required
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
              required
            />
          </div>

          <div className="form-group">
            <label>Xác nhận mật khẩu</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Nhập lại mật khẩu"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="btn-register">
            {loading ? '⏳ Đang đăng ký...' : '✍️ Đăng Ký'}
          </button>
        </form>

        <p className="auth-link">
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
```

---

## 4. CÁCH GỌINAPI TRONG FILE SERVICE

### 4.1 authAPI.js (Login/Register)

```javascript
const API_BASE_URL = 'https://api.lehuuminhquan.id.vn';

const authAPI = {
  // ĐĂNG NHẬP
  login: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return await response.json();
    } catch (error) {
      console.error('Login API error:', error);
      return { success: false, message: 'Lỗi kết nối API' };
    }
  },

  // ĐĂNG KÝ
  register: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return await response.json();
    } catch (error) {
      console.error('Register API error:', error);
      return { success: false, message: 'Lỗi kết nối API' };
    }
  },

  // ĐĂNG XUẤT
  logout: async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      return await response.json();
    } catch (error) {
      console.error('Logout API error:', error);
      return { success: false };
    }
  }
};

export default authAPI;
```

### 4.2 productsAPI.js (Lấy sản phẩm)

```javascript
const API_BASE_URL = 'https://api.lehuuminhquan.id.vn';

const productsAPI = {
  // LẤY DANH SÁCH SẢN PHẨM
  getProducts: async (page = 1, limit = 10, category = '', search = '') => {
    try {
      const params = new URLSearchParams({
        page,
        limit,
        ...(category && { category }),
        ...(search && { search })
      });

      const response = await fetch(`${API_BASE_URL}/products?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      return await response.json();
    } catch (error) {
      console.error('Get products error:', error);
      return { success: false, message: 'Lỗi kết nối API' };
    }
  },

  // LẤY CHI TIẾT SẢN PHẨM
  getProductById: async (productId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      return await response.json();
    } catch (error) {
      console.error('Get product detail error:', error);
      return { success: false, message: 'Lỗi kết nối API' };
    }
  },

  // TÌM KIẾM SẢN PHẨM
  searchProducts: async (keyword) => {
    return productsAPI.getProducts(1, 20, '', keyword);
  }
};

export default productsAPI;
```

---

## 5. CẬP NHẬT App.jsx

```javascript
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage'));
const Categories = lazy(() => import('./pages/Categories'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="main-content">
              <Suspense fallback={<div className="loading">⏳ Đang tải...</div>}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
```

---

## 6. FLOW HOẠT ĐỘNG TOÀN BỘ

```
┌─────────────────────────────────────────┐
│         HOMEPAGE (Trang chủ)             │
│  - Hiển thị danh sách sản phẩm          │
│  - Chào mừng user nếu đã đăng nhập      │
└─────────────────────────────────────────┘
          ↓              ↓              ↓
    [Products]     [Categories]    [Login/Register]
          ↓
┌─────────────────────────────────────────┐
│    PRODUCT DETAIL (Chi tiết sản phẩm)    │
│  - Xem chi tiết sản phẩm                │
│  - Thêm vào giỏ hàng (cần login)        │
└─────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────┐
│         CART (Giỏ hàng)                  │
│  - Xem giỏ hàng                         │
│  - Cập nhật số lượng                    │
│  - Xóa sản phẩm                         │
└─────────────────────────────────────────┘
          ↓
┌─────────────────────────────────────────┐
│      CHECKOUT (Thanh toán)               │
│  - Điền thông tin giao hàng             │
│  - Chọn phương thức thanh toán          │
│  - Hoàn tất đơn hàng                    │
└─────────────────────────────────────────┘
```

---

## 7. QUICK START

1. **Tạo HomePage.jsx**:
   - Lấy sản phẩm từ API
   - Hiển thị danh sách sản phẩm
   - Chào mừng user đăng nhập

2. **Cập nhật Login.jsx**:
   - Gọi API đăng nhập
   - Lưu token vào localStorage
   - Lưu user vào context

3. **Cập nhật Register.jsx**:
   - Gọi API đăng ký
   - Validate mật khẩu
   - Tự động đăng nhập sau khi đăng ký

4. **Cập nhật App.jsx**:
   - Import HomePage
   - Thêm route "/"

5. **Chạy server**:
   ```bash
   npm run dev
   ```

---

## 8. POSTMAN TESTING

Test API với Postman:

1. **Login**:
   - URL: `POST https://api.lehuuminhquan.id.vn/auth/login`
   - Body: `{"email":"user1@example.com","password":"Password123"}`

2. **Register**:
   - URL: `POST https://api.lehuuminhquan.id.vn/auth/register`
   - Body: `{"email":"user3@example.com","password":"Pass123","fullName":"Trần Văn C","phone":"0912345678"}`

3. **Get Products**:
   - URL: `GET https://api.lehuuminhquan.id.vn/products?page=1&limit=10`

4. **Get Product Detail**:
   - URL: `GET https://api.lehuuminhquan.id.vn/products/1`

---

**🚀 Bạn đã sẵn sàng để kết nối API!**
