# 📊 TÓBÁT TẮT FLOW KẾT NỐI API

## 🎯 TÓM TẮT

```
┌─────────────────────────────────────────────────────────┐
│              TPNQT SHOP - ARCHITECTURE                  │
└─────────────────────────────────────────────────────────┘

                    Frontend (React + Vite)
                    ↓
        ┌──────────────────────────────┐
        │  User Interface              │
        │  (Homepage, Login, Cart...)  │
        └──────────────────────────────┘
                    ↓
        ┌──────────────────────────────┐
        │  State Management            │
        │  (AuthContext, CartContext)  │
        └──────────────────────────────┘
                    ↓
        ┌──────────────────────────────┐
        │  Services (API Calls)        │
        │  (authAPI.js, productsAPI)   │
        └──────────────────────────────┘
                    ↓
        ┌──────────────────────────────┐
        │  Backend API                 │
        │  https://api.lehuuminhquan.. │
        └──────────────────────────────┘
```

---

## 📁 STRUCTURE & FILES

### **1. Pages (Trang)**
```
src/pages/
├── HomePage.jsx          ✅ NEW - Trang chủ (sản phẩm + welcome)
├── Login.jsx             🔧 Đăng nhập
├── Register.jsx          🔧 Đăng ký
├── Categories.jsx        📦 Danh mục sản phẩm
├── ProductDetail.jsx     📦 Chi tiết sản phẩm
├── Cart.jsx              🛒 Giỏ hàng
└── Checkout.jsx          💳 Thanh toán
```

### **2. Services (API Calls)**
```
src/services/
├── authAPI.js            🔐 Login/Register API
├── productsAPI.js        📦 Products API
└── mockProductsData.js   💾 Mock data (backup)
```

### **3. Contexts (State Management)**
```
src/contexts/
├── AuthContext.jsx       👤 User authentication
└── CartContext.jsx       🛒 Shopping cart
```

### **4. Components (Reusable)**
```
src/components/
├── Header.jsx            🎨 Navigation bar
├── Footer.jsx            🎨 Footer
├── Hero.jsx              🎨 Hero banner
├── Products.jsx          🎨 Product list
├── Promotions.jsx        🎨 Promotions
├── SearchFilter.jsx      🎨 Search & filter
└── ErrorBoundary.jsx     🛡️ Error handling
```

### **5. Styles (CSS)**
```
src/styles/
├── Home.css              🎨 NEW - Homepage styles
├── Auth.css              🎨 Login/Register styles
├── Cart.css              🎨 Cart styles
├── Checkout.css          🎨 Checkout styles
└── ...
```

---

## 🔄 COMPLETE FLOW

### **STEP 1: User visits Homepage**
```javascript
// HomePage.jsx
useEffect(() => {
  // Call API to get products
  const response = await productsAPI.getProducts(1, 20);
  // Set products to state
  setProducts(response.data);
}, []);
```

### **STEP 2: User clicks Login**
```javascript
// Login.jsx
const handleSubmit = async (e) => {
  // Call API to login
  const response = await authAPI.login({
    email: 'user1@example.com',
    password: 'Password123'
  });
  
  // Save token & user
  login(response.user, response.token);
  
  // Redirect to home
  navigate('/');
};
```

### **STEP 3: AuthContext saves user**
```javascript
// AuthContext.jsx
const login = (user, token) => {
  setUser(user);
  setIsAuthenticated(true);
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};
```

### **STEP 4: Header shows user info**
```javascript
// Header.jsx
const { user, isAuthenticated, logout } = useAuth();

// If logged in, show user dropdown
{isAuthenticated && (
  <Dropdown title={user.name}>
    <Dropdown.Item>Tài khoản</Dropdown.Item>
    <Dropdown.Item>Đơn hàng</Dropdown.Item>
    <Dropdown.Item onClick={logout}>Đăng xuất</Dropdown.Item>
  </Dropdown>
)}
```

### **STEP 5: User adds product to cart**
```javascript
// ProductDetail.jsx
const { addToCart } = useCart();

const handleAddToCart = () => {
  addToCart({
    productId: product.id,
    name: product.name,
    price: product.price,
    quantity: 1
  });
};
```

### **STEP 6: User goes to checkout**
```javascript
// Checkout.jsx
const handleSubmit = async (formData) => {
  // Create order via API
  const response = await fetch(
    'https://api.lehuuminhquan.id.vn/orders/create',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...formData,
        items: cart.items
      })
    }
  );
};
```

---

## 🚀 HOW TO CALL API

### **Simple Example**
```javascript
// Get Products
const response = await fetch(
  'https://api.lehuuminhquan.id.vn/products?page=1&limit=20',
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
);
const data = await response.json();
console.log(data.data); // Product list
```

### **With Authentication**
```javascript
// Get User Cart
const token = localStorage.getItem('token');
const response = await fetch(
  'https://api.lehuuminhquan.id.vn/cart',
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }
);
const data = await response.json();
```

### **POST Request**
```javascript
// Login
const response = await fetch(
  'https://api.lehuuminhquan.id.vn/auth/login',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: 'user1@example.com',
      password: 'Password123'
    })
  }
);
const data = await response.json();
console.log(data.token); // Save this
```

---

## 📋 FOLDER ORGANIZATION TIPS

### **Best Practice**
```
services/          → API calls (authAPI, productsAPI)
contexts/          → Global state (AuthContext, CartContext)
pages/             → Full pages (HomePage, Login, Cart)
components/        → Reusable UI (Header, Button, Card)
styles/            → CSS files (one per page)
utils/             → Helper functions
assets/            → Images, icons, fonts
```

### **File Naming Convention**
```
✅ HomePage.jsx        (Components: PascalCase)
✅ authAPI.js          (Services: camelCase)
✅ AuthContext.jsx     (Contexts: PascalCase)
✅ auth.css            (Styles: lowercase)
```

---

## ✅ WHAT'S BEEN CREATED

| Item | File | Status |
|------|------|--------|
| HomePage | src/pages/HomePage.jsx | ✅ Created |
| Home CSS | src/styles/Home.css | ✅ Created |
| Structure Guide | STRUCTURE_GUIDE.md | ✅ Created |
| API Docs | API_DOCUMENTATION.md | ✅ Created |
| App.jsx | Updated | ✅ Updated |

---

## 🔑 KEY API ENDPOINTS

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | /auth/login | Đăng nhập |
| POST | /auth/register | Đăng ký |
| POST | /auth/logout | Đăng xuất |
| GET | /products | Lấy danh sách |
| GET | /products/:id | Chi tiết sản phẩm |
| GET | /cart | Lấy giỏ hàng |
| POST | /cart/add | Thêm vào giỏ |
| POST | /orders/create | Tạo đơn hàng |

---

## 🧪 QUICK TEST

1. **Homepage**: `http://localhost:5173/`
   - Should show products
   - Should show welcome banner if logged in

2. **Login**: `http://localhost:5173/login`
   - Try: `user1@example.com` / `Password123`
   - Should redirect to home

3. **Register**: `http://localhost:5173/register`
   - Create new account
   - Should auto-login

4. **Product Detail**: Click any product
   - Should show product info
   - Can add to cart

5. **Cart**: `http://localhost:5173/cart`
   - Should show items
   - Can update quantity

6. **Checkout**: Click "Checkout" button
   - Should show form
   - Can create order

---

## 📱 RESPONSIVE DESIGN

All pages are mobile-responsive:
- Desktop: Full layout
- Tablet: 2-column layout
- Mobile: Single column

---

## 🚀 NEXT STEPS

1. **Run the server**:
   ```bash
   npm run dev
   ```

2. **Test Login**:
   - Go to `/login`
   - Use demo account: `user1@example.com` / `Password123`

3. **Test Homepage**:
   - Products should load from API
   - Welcome message should show

4. **Test Cart**:
   - Add products
   - Go to checkout
   - Complete purchase

5. **Connect Real API**:
   - Update `API_BASE_URL` in service files
   - Replace mock data with API calls

---

## 💡 TIPS

- **localStorage**: Used for token & cart persistence
- **Context**: Used for global state (user, cart)
- **Suspense**: Used for lazy loading pages
- **ErrorBoundary**: Used for error handling
- **Mock Data**: Used as backup if API fails

---

**✨ You're all set! Start the server and begin testing!**
