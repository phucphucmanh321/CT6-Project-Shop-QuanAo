# TPNQT Shop - Công Nghệ & Cấu Trúc Project

## 🛠️ Công Nghệ Sử Dụng

### Frontend Framework
- **React 18** - UI library chính
- **Vite 8.0.3** - Build tool & dev server (cực nhanh)
- **React Router DOM v6.6** - Routing & navigation

### UI & Styling
- **React Bootstrap 2.x** - Component library
- **Bootstrap CSS** - CSS framework
- **React Icons** - SVG icons library
- **CSS Modules** - Styling individual components

### State Management
- **React Context API** - Global state (Auth, Cart)
- **localStorage** - Persist data (token, cart, user)
- **React Hooks** - useState, useEffect, useContext, useCallback

### HTTP & API
- **Fetch API** - API calls (không cần axios)
- **Mock Data** - 20 sản phẩm hardcoded

### Development
- **Node.js & npm** - Package manager
- **ESLint** - Code linting
- **Hot Module Replacement (HMR)** - Vite reload

---

## 📁 Cấu Trúc Folder & Chức Năng

```
src/
├── components/          # React components
│   ├── Header.jsx              ✨ Menu, nav, logout
│   ├── Footer.jsx
│   ├── Hero.jsx                🎨 Banner trang chủ
│   ├── Products.jsx            📦 Hiển thị danh sách sản phẩm
│   ├── Promotions.jsx          🎁 Khuyến mãi
│   ├── Categories.jsx          🏷️ Danh mục sản phẩm
│   ├── SearchFilter.jsx        🔍 Tìm kiếm & lọc
│   └── ErrorBoundary.jsx       ⚠️ Catch component errors
│
├── pages/               # Page components
│   ├── Login.jsx               👤 Form đăng nhập
│   ├── Register.jsx            📝 Form đăng ký
│   ├── ProductDetail.jsx       📋 Chi tiết sản phẩm
│   ├── Cart.jsx                🛒 Giỏ hàng
│   ├── Checkout.jsx            💳 Thanh toán
│   └── Categories.jsx
│
├── contexts/            # Global state
│   ├── AuthContext.jsx         🔐 Quản lý auth, user, token
│   └── CartContext.jsx         🛒 Quản lý giỏ hàng
│
├── services/            # API & data
│   ├── authAPI.js              🔑 Đăng nhập, đăng ký
│   ├── productsAPI.js          📦 Lấy danh sách sản phẩm
│   └── mockProductsData.js     📊 20 sản phẩm mock data
│
├── styles/              # CSS files
│   ├── Header.css
│   ├── Footer.css
│   ├── Auth.css                👤 Styling login/register
│   ├── Cart.css                🛒 Styling giỏ hàng
│   ├── Checkout.css            💳 Styling thanh toán
│   ├── Products.css            📦 Styling danh sách sản phẩm
│   └── ProductDetail.css       📋 Styling chi tiết sản phẩm
│
├── assets/              # Ảnh & tài nguyên
│   └── images/products/        📸 20 ảnh sản phẩm thực
│
├── utils/               # Helper functions
│   └── addDemoAccounts.js      ✨ Script thêm demo account
│
├── App.jsx              # Root app component
├── main.jsx             # Entry point với providers
├── App.css              # Global styles
└── index.css
```

---

## 🔐 **Đăng Nhập / Đăng Ký**

### File chính
- **`src/services/authAPI.js`** - API login/register
- **`src/contexts/AuthContext.jsx`** - Auth state management
- **`src/pages/Login.jsx`** - Form đăng nhập
- **`src/pages/Register.jsx`** - Form đăng ký

### Chức năng
```
📧 Email: user1@example.com
🔑 Pass: Password123

📧 Email: user2@example.com  
🔑 Pass: Password456
```

- ✅ Kiểm tra demo accounts trong authAPI.js
- ✅ Lưu token vào localStorage
- ✅ Tự động restore user khi reload
- ✅ Dropdown logout ở header

---

## 🛒 **Giỏ Hàng (Shopping Cart)**

### File chính
- **`src/contexts/CartContext.jsx`** - Cart state & logic
- **`src/pages/Cart.jsx`** - Hiển thị giỏ hàng
- **`src/styles/Cart.css`** - Styling giỏ hàng

### Chức năng
- ➕ Thêm sản phẩm (button "Thêm vào giỏ hàng")
- ➖ Xóa sản phẩm
- 🔢 Thay đổi số lượng
- 💰 Tính toán:
  - Subtotal (tổng tiền)
  - Shipping fee (30k nếu < 500k, free nếu >= 500k)
  - Tax (10% of subtotal)
  - Grand total (tổng cuối)
- 💾 Lưu giỏ hàng vào localStorage (persist khi reload)
- 🔔 Toast notification khi thêm sản phẩm

---

## 📦 **Danh Sách Sản Phẩm**

### File chính
- **`src/services/mockProductsData.js`** - 20 sản phẩm data
- **`src/components/Products.jsx`** - Hiển thị danh sách
- **`src/pages/ProductDetail.jsx`** - Chi tiết sản phẩm
- **`src/styles/Products.css`** - Styling sản phẩm
- **`src/styles/ProductDetail.css`** - Styling chi tiết

### Chức năng
- 📋 Danh sách 20 sản phẩm với:
  - Hình ảnh thực
  - Tên sản phẩm
  - Giá (169k - 449k VND)
  - Mô tả chi tiết
  - Kích thước, màu sắc, chất liệu
  - Số lượng tồn kho
- 🔗 Click vào sản phẩm → Xem chi tiết
- 🛒 Thêm vào giỏ hàng từ chi tiết page
- 🏷️ Lọc theo danh mục (Áo, Polo, v.v)
- 🔍 Tìm kiếm sản phẩm

### 20 Sản Phẩm
```
1. Big SS Long Tee Black - 199k
2. Striped Sweatshirt Navy - 349k
3. Striped Long Sleeve Tee - 279k
4. Sweatshirt Black - 399k
5. Long Sleeve Tee White - 189k
6. Knit Sweater Navy - 449k
7. Numbered Tee 9 - 219k
8. Doc Tee Black - 229k
9. Golf Tee Black - 219k
10. DNA Gradient Tee - 249k
11. DNA Neon Tee - 259k
12. Colorblock Tee - 279k
13. Queen Mouse Tee White - 209k
14. Spider Baby Gray - 199k
15. Spider Baby Black - 199k
16. Plain Tee Gray - 169k
17. Plain Tee Gray Large - 169k
18. Polo Shirt Tan - 299k
19. Polo Shirt White - 299k
20. Polo Shirt Black - 299k
```

---

## 💳 **Thanh Toán (Checkout)**

### File chính
- **`src/pages/Checkout.jsx`** - Form thanh toán
- **`src/styles/Checkout.css`** - Styling

### Chức năng
- ✍️ Form nhập thông tin:
  - Tên đầy đủ
  - Email
  - Số điện thoại
  - Địa chỉ
  - Thành phố
  - Mã bưu điện
- 📮 Chọn hình thức gửi:
  - Standard (free)
  - Express (+20k)
- 💳 Chọn hình thức thanh toán:
  - Credit card
  - Bank transfer
  - Cash on delivery (COD)
- ✅ Form validation
- 🎉 Success animation
- 🧹 Clear giỏ hàng sau khi order

---

## 🔗 **Routes**

```
/                  → Trang chủ (Home)
/categories        → Danh mục sản phẩm
/product/:id       → Chi tiết sản phẩm
/cart              → Giỏ hàng
/checkout          → Thanh toán
/login             → Đăng nhập
/register          → Đăng ký
```

---

## 💾 **Data Persistence**

### localStorage Keys
```javascript
token              // JWT token sau khi login
user               // User info (JSON)
cart               // Giỏ hàng (JSON array)
```

### Example Cart Item
```javascript
{
  id: 1,
  name: 'Big SS Long Tee Black',
  price: 199000,
  image: '/src/assets/images/products/product-1-big-ss-long-tee-black.jpg',
  quantity: 2,
  category: 'Áo'
}
```

---

## 📊 **Package.json Dependencies**

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.6.0",
    "react-bootstrap": "^2.9.0",
    "react-icons": "^4.12.0",
    "bootstrap": "^5.3.0"
  },
  "devDependencies": {
    "vite": "^8.0.3",
    "@vitejs/plugin-react": "^4.2.0",
    "eslint": "^8.56.0"
  }
}
```

---

## 🎯 **Luồng User**

```
1. User vào trang chủ
   → Xem 20 sản phẩm
   
2. Click vào sản phẩm
   → Xem chi tiết
   → Click "Thêm vào giỏ hàng"
   
3. Vào giỏ hàng (/cart)
   → Xem danh sách item
   → Thay đổi số lượng
   → Click "Tiến hành thanh toán"
   
4. Vào checkout (/checkout)
   → Điền thông tin
   → Chọn hình thức gửi
   → Chọn thanh toán
   → Submit order
   → Clear giỏ hàng
   
5. Hoặc đăng nhập trước
   → Login.jsx (/login)
   → Xác thực email/password
   → Redirect trang chủ
   → Hiển thị user ở header dropdown
```

---

## 🚀 **Chạy Project**

```bash
# Dev server (localhost:5173)
npm run dev

# Build production
npm run build

# Preview build
npm run preview
```

---

Thế là bạn có hình dung về project! 🎉
