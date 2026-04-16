# 📍 Vị Trí Code Các Chức Năng

## 1️⃣ HOMEPAGE

### File chính
```
src/App.jsx  → Route "/"
```

### Các component nằm trên homepage

**a) Hero (Banner trang chủ)**
```
📁 src/components/Hero.jsx (dòng 1-50)

Chứa:
- Tiêu đề lớn "Thời Trang Năng Động"
- Subtitle giới thiệu
- 2 nút: "Mua Sắm Ngay" và "Xem Bộ Sưu Tập"
- Banner khuyến mãi (GIAO HÀNG NHANH, ĐỔI HÀNG, HỖ TRỢ 24/7)
```

**b) Products (Danh sách sản phẩm)**
```
📁 src/components/Products.jsx

Chứa:
- Hiển thị 20 sản phẩm dưới dạng grid
- Mỗi sản phẩm có: hình ảnh, tên, giá, nút "Xem Chi Tiết"
- Nút "Thêm vào giỏ hàng"
```

**c) Promotions (Khuyến mãi)**
```
📁 src/components/Promotions.jsx

Chứa:
- Banner giảm giá
- Khuyến mãi mùa hè, hè xanh, v.v
```

**d) SearchFilter (Tìm kiếm & Lọc)**
```
📁 src/components/SearchFilter.jsx

Chứa:
- Ô tìm kiếm sản phẩm
- Dropdown lọc theo danh mục
- Lọc theo giá (min-max)
```

**e) Header (Menu trên cùng)**
```
📁 src/components/Header.jsx

Chứa:
- Logo "TPNQT"
- Menu: Trang chủ | Sản phẩm | Về chúng tôi | Liên hệ
- User menu: Đăng nhập | Đăng ký
- Giỏ hàng (🛒) + số lượng item
- Dropdown logout (nếu đã đăng nhập)
```

**f) Footer**
```
📁 src/components/Footer.jsx

Chứa:
- Thông tin liên hệ
- Links xã hội
- Copyright
```

### Dữ liệu sản phẩm
```
📁 src/services/mockProductsData.js (dòng 1-300)

Chứa:
- 20 sản phẩm với:
  {
    id: 1,
    name: "Big SS Long Tee Black",
    price: 199000,
    image: "/src/assets/images/products/product-1-big-ss-long-tee-black.jpg",
    description: "...",
    color: ["Black", "White"],
    size: ["S", "M", "L", "XL"],
    material: "100% Cotton",
    stock: 25,
    category: "Áo"
  }
```

---

## 2️⃣ ĐĂNG NHẬP

### File chính
```
📁 src/pages/Login.jsx (116 dòng)
Route: "/login"
```

### Cấu trúc code

**Dòng 1-5:** Import libraries
```javascript
import { useState } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Auth.css';
```

**Dòng 7-14:** State management
```javascript
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [showPassword, setShowPassword] = useState(false);
const { login, isLoading, error } = useAuth();
const navigate = useNavigate();
const [localError, setLocalError] = useState('');
```

**Dòng 16-29:** Handle submit form
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setLocalError('');

  if (!email || !password) {
    setLocalError('Vui lòng nhập email và mật khẩu');
    return;
  }

  try {
    await login(email, password);
    navigate('/');
  } catch (err) {
    setLocalError(err.message || 'Đăng nhập thất bại');
  }
};
```

**Dòng 31-116:** Form UI
- Form.Group Email (dòng 48-57)
- Form.Group Password + show/hide (dòng 59-77)
- Submit button (dòng 79-85)
- Link "Chưa có tài khoản? Đăng ký" (dòng 86-87)

### Demo accounts
```javascript
📁 src/services/authAPI.js (dòng 1-20)

const demoAccounts = [
  {
    email: 'user1@example.com',
    password: 'Password123',
    name: 'Nguyễn Văn A',
    phone: '0901234567'
  },
  {
    email: 'user2@example.com',
    password: 'Password456',
    name: 'Trần Thị B',
    phone: '0987654321'
  }
];
```

### Authentication logic
```
📁 src/contexts/AuthContext.jsx

- login() function → gọi authAPI.login()
- register() function → gọi authAPI.register()
- logout() function → xóa token từ localStorage
- Lưu token & user vào localStorage
- Auto restore user khi reload page
```

### API method
```javascript
📁 src/services/authAPI.js

export const login = async (email, password) => {
  // Kiểm tra demo accounts (dòng...)
  const demoAccount = demoAccounts.find(acc => acc.email === email);
  if (demoAccount && demoAccount.password === password) {
    return { token: 'demo-token', user: demoAccount };
  }
  
  // Hoặc gọi real API
  const response = await fetch('api.lehuuminhquan.id.vn/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  return response.json();
};
```

---

## 3️⃣ ĐĂNG KÝ

### File chính
```
📁 src/pages/Register.jsx (181 dòng)
Route: "/register"
```

### Cấu trúc code

**Dòng 1-5:** Import libraries
```javascript
import { useState } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Auth.css';
```

**Dòng 7-20:** State management
```javascript
const [formData, setFormData] = useState({
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
});
const [showPassword, setShowPassword] = useState(false);
const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
const { register, isLoading, error } = useAuth();
const navigate = useNavigate();
const [localError, setLocalError] = useState('');
```

**Dòng 22-27:** Handle change input
```javascript
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};
```

**Dòng 29-61:** Handle submit + validation
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setLocalError('');

  // Validation (dòng 31-47)
  if (!formData.name || !formData.email || !formData.password || !formData.passwordConfirm) {
    setLocalError('Vui lòng điền tất cả các trường');
    return;
  }

  if (formData.password !== formData.passwordConfirm) {
    setLocalError('Mật khẩu không khớp');
    return;
  }

  if (formData.password.length < 6) {
    setLocalError('Mật khẩu phải có ít nhất 6 ký tự');
    return;
  }

  // Call API (dòng 53-61)
  try {
    await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
    navigate('/');
  } catch (err) {
    setLocalError(err.message || 'Đăng ký thất bại');
  }
};
```

**Dòng 63-181:** Form UI
- Form.Group Tên đầy đủ
- Form.Group Email
- Form.Group Password + show/hide
- Form.Group Xác nhận mật khẩu + show/hide
- Submit button
- Link "Đã có tài khoản? Đăng nhập"

### Validation rules
```
✅ Tất cả field bắt buộc
✅ Email phải hợp lệ
✅ Password ≥ 6 ký tự
✅ Password và Xác nhận phải giống nhau
✅ Show/Hide password toggle
```

---

## 4️⃣ CHI TIẾT SẢN PHẨM (ProductDetail)

### File chính
```
📁 src/pages/ProductDetail.jsx (261 dòng)
Route: "/product/:id"
```

### Cấu trúc code

**Dòng 1-8:** Import libraries
```javascript
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Alert, Spinner, Button, Toast } from 'react-bootstrap';
import { FaArrowLeft, FaShoppingCart, FaHeart, FaCheck } from 'react-icons/fa';
import productsAPI from '../services/productsAPI';
import { useCart } from '../contexts/CartContext';
import '../styles/ProductDetail.css';
```

**Dòng 10-18:** State management
```javascript
const { id } = useParams();  // Lấy ID từ URL (/product/1)
const navigate = useNavigate();
const { addToCart } = useCart();
const [product, setProduct] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [quantity, setQuantity] = useState(1);
const [showToast, setShowToast] = useState(false);
```

**Dòng 20-50:** Fetch sản phẩm by ID
```javascript
useEffect(() => {
  const fetchProduct = async () => {
    try {
      setLoading(true);
      
      // Try API first
      let product = await productsAPI.getProductById(id);
      
      // Fallback: get all and find by id
      if (!product) {
        const allData = await productsAPI.getAllProducts();
        product = allData.find(p => p.id == id);
      }
      
      if (!product) {
        throw new Error('Không tìm thấy sản phẩm');
      }
      
      setProduct(product);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchProduct();
}, [id]);
```

**Dòng 52-100:** Handle add to cart
```javascript
const handleAddToCart = () => {
  if (!product) return;
  
  addToCart({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    quantity: quantity,
    category: product.category
  });
  
  setShowToast(true);
  // Ẩn toast sau 2 giây
  setTimeout(() => setShowToast(false), 2000);
};
```

**Dòng 102-261:** Render UI
```javascript
return (
  <Container>
    {/* Nút quay lại */}
    <button onClick={() => navigate(-1)}>
      <FaArrowLeft /> Quay lại
    </button>

    {/* Loading state */}
    {loading && <Spinner animation="border" />}

    {/* Error state */}
    {error && <Alert variant="danger">{error}</Alert>}

    {/* Product content */}
    {product && (
      <Row>
        <Col lg={6}>
          {/* Hình ảnh sản phẩm */}
          <img src={product.image} alt={product.name} />
        </Col>
        <Col lg={6}>
          {/* Thông tin sản phẩm */}
          <h1>{product.name}</h1>
          <p className="price">{product.price.toLocaleString()}đ</p>
          <p className="description">{product.description}</p>
          
          {/* Color selector */}
          <div className="colors">
            {product.color?.map(c => (
              <button key={c} className="color-btn">{c}</button>
            ))}
          </div>
          
          {/* Size selector */}
          <div className="sizes">
            {product.size?.map(s => (
              <button key={s} className="size-btn">{s}</button>
            ))}
          </div>
          
          {/* Quantity input */}
          <div className="quantity">
            <button onClick={() => setQuantity(q => q - 1)}>−</button>
            <input type="number" value={quantity} />
            <button onClick={() => setQuantity(q => q + 1)}>+</button>
          </div>
          
          {/* Buttons */}
          <button onClick={handleAddToCart} className="btn-add-cart">
            <FaShoppingCart /> Thêm vào giỏ hàng
          </button>
          <button className="btn-wishlist">
            <FaHeart /> Yêu thích
          </button>
        </Col>
      </Row>
    )}

    {/* Toast notification */}
    <Toast show={showToast}>
      <Toast.Body><FaCheck /> Thêm vào giỏ hàng thành công</Toast.Body>
    </Toast>
  </Container>
);
```

### Product data structure
```javascript
{
  id: 1,
  name: "Big SS Long Tee Black",
  price: 199000,
  image: "/src/assets/images/products/product-1-big-ss-long-tee-black.jpg",
  description: "Áo thun cơ bản với kiểu dáng...",
  color: ["Black", "White", "Gray"],
  size: ["S", "M", "L", "XL"],
  material: "100% Cotton",
  stock: 25,
  category: "Áo"
}
```

### API methods
```javascript
📁 src/services/productsAPI.js

export const getProductById = (id) => {
  return mockProducts.find(p => p.id == id);
};

export const getAllProducts = () => {
  return mockProducts;
};
```

---

## 📂 File Structure Summary

```
src/
├── components/
│   ├── Header.jsx              ← Menu & user
│   ├── Footer.jsx              ← Footer
│   ├── Hero.jsx                ← Banner (HOMEPAGE)
│   ├── Products.jsx            ← Product list (HOMEPAGE)
│   ├── Promotions.jsx          ← Promo banner (HOMEPAGE)
│   ├── SearchFilter.jsx        ← Search & filter
│   └── ErrorBoundary.jsx       ← Error handler
│
├── pages/
│   ├── Login.jsx               ← ĐĂNG NHẬP page
│   ├── Register.jsx            ← ĐĂNG KÝ page
│   ├── ProductDetail.jsx       ← CHI TIẾT SẢN PHẨM page
│   ├── Cart.jsx                ← Giỏ hàng
│   ├── Checkout.jsx            ← Thanh toán
│   └── Categories.jsx          ← Danh mục
│
├── contexts/
│   ├── AuthContext.jsx         ← User login/logout logic
│   └── CartContext.jsx         ← Cart add/remove logic
│
├── services/
│   ├── authAPI.js              ← Login/register API
│   ├── productsAPI.js          ← Get product API
│   └── mockProductsData.js     ← 20 product data
│
├── styles/
│   ├── Auth.css                ← Login/Register styling
│   ├── Products.css            ← Product list styling
│   ├── ProductDetail.css       ← Detail page styling
│   ├── Cart.css                ← Cart page styling
│   └── ... (other styles)
│
├── App.jsx                     ← Main app + routes
├── main.jsx                    ← Entry point
└── assets/images/products/     ← 20 product images
```

---

## 🔗 Navigation Flow

```
HOMEPAGE (/)
  ↓
  Hero component
  Products component → Click "Xem Chi Tiết"
  ↓
  ProductDetail page (/product/:id)
    ↓
    Click "Thêm vào giỏ hàng"
    ↓
  Cart page (/cart)
    ↓
    Click "Tiến hành thanh toán"
    ↓
  Checkout page (/checkout)

SIDEBAR:
  Header → Click "Đăng nhập" → Login page (/login)
  Header → Click "Đăng ký" → Register page (/register)
```

---

## 🎯 Quick Reference

| Chức Năng | File | Dòng | Route |
|-----------|------|------|-------|
| Homepage | App.jsx | 23 | / |
| Hero banner | Hero.jsx | 1-50 | (part of /) |
| Product list | Products.jsx | - | (part of /) |
| Đăng nhập | Login.jsx | 1-116 | /login |
| Đăng ký | Register.jsx | 1-181 | /register |
| Chi tiết SP | ProductDetail.jsx | 1-261 | /product/:id |
| Giỏ hàng | Cart.jsx | - | /cart |
| Thanh toán | Checkout.jsx | - | /checkout |
| Auth logic | AuthContext.jsx | - | - |
| Cart logic | CartContext.jsx | - | - |
| Product data | mockProductsData.js | 1-300 | - |
| Auth API | authAPI.js | - | - |

