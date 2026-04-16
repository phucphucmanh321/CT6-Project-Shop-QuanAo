# 📚 Hướng Dẫn Gọi API - TPNQT Shop

## 1. **Tổng Quan API**

**Base URL**: `https://api.lehuuminhquan.id.vn`

API hỗ trợ các chức năng chính:
- 🔐 Xác thực (Đăng nhập, Đăng ký)
- 📦 Quản lý sản phẩm (Lấy danh sách, Chi tiết)
- 🛒 Giỏ hàng (Thêm, Xóa, Cập nhật)
- 💳 Thanh toán (Tạo đơn, Xác nhận)

---

## 2. **Authentication (Xác Thực)**

### 2.1 Đăng Ký (Register)
```
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password123",
  "fullName": "Nguyễn Văn A",
  "phone": "0901234567"
}

Response: {
  "success": true,
  "message": "Đăng ký thành công",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "Nguyễn Văn A",
    "phone": "0901234567"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2.2 Đăng Nhập (Login)
```
POST /auth/login
Content-Type: application/json

{
  "email": "user1@example.com",
  "password": "Password123"
}

Response: {
  "success": true,
  "message": "Đăng nhập thành công",
  "user": {
    "id": 1,
    "email": "user1@example.com",
    "name": "Nguyễn Văn A",
    "phone": "0901234567"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2.3 Đăng Xuất (Logout)
```
POST /auth/logout
Authorization: Bearer <token>

Response: {
  "success": true,
  "message": "Đã đăng xuất thành công"
}
```

---

## 3. **Products (Sản Phẩm)**

### 3.1 Lấy Danh Sách Sản Phẩm
```
GET /products?page=1&limit=10&category=Áo&search=tee

Response: {
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Big SS Long Tee Black",
      "category": "Áo",
      "price": 199000,
      "image": "https://...",
      "description": "Áo thun...",
      "stock": 25,
      "rating": 4.5,
      "reviews": 12
    },
    ...
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 20
  }
}
```

### 3.2 Lấy Chi Tiết Sản Phẩm
```
GET /products/:id

Response: {
  "success": true,
  "data": {
    "id": 1,
    "name": "Big SS Long Tee Black",
    "category": "Áo",
    "price": 199000,
    "image": "https://...",
    "description": "Áo thun dài tay...",
    "material": "100% Cotton",
    "size": ["S", "M", "L", "XL", "XXL"],
    "color": "Đen",
    "stock": 25,
    "rating": 4.5,
    "reviews": [
      {
        "id": 1,
        "user": "Nguyễn A",
        "rating": 5,
        "comment": "Áo đẹp lắm!",
        "createdAt": "2026-04-10"
      }
    ]
  }
}
```

---

## 4. **Cart (Giỏ Hàng)**

### 4.1 Thêm Sản Phẩm Vào Giỏ
```
POST /cart/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": 1,
  "quantity": 2,
  "size": "M",
  "color": "Đen"
}

Response: {
  "success": true,
  "message": "Đã thêm vào giỏ hàng",
  "cart": {
    "id": "cart_123",
    "items": [
      {
        "id": "item_1",
        "productId": 1,
        "name": "Big SS Long Tee Black",
        "price": 199000,
        "quantity": 2,
        "size": "M",
        "color": "Đen",
        "subtotal": 398000
      }
    ],
    "total": 398000
  }
}
```

### 4.2 Cập Nhật Số Lượng
```
PUT /cart/update/:itemId
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantity": 3
}

Response: {
  "success": true,
  "message": "Cập nhật giỏ hàng thành công",
  "cart": { ... }
}
```

### 4.3 Xóa Sản Phẩm Khỏi Giỏ
```
DELETE /cart/remove/:itemId
Authorization: Bearer <token>

Response: {
  "success": true,
  "message": "Đã xóa khỏi giỏ hàng",
  "cart": { ... }
}
```

### 4.4 Lấy Giỏ Hàng Hiện Tại
```
GET /cart
Authorization: Bearer <token>

Response: {
  "success": true,
  "cart": {
    "id": "cart_123",
    "items": [...],
    "subtotal": 398000,
    "shipping": 30000,
    "tax": 42800,
    "total": 470800
  }
}
```

---

## 5. **Orders (Đơn Hàng)**

### 5.1 Tạo Đơn Hàng
```
POST /orders/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "customerName": "Nguyễn Văn A",
  "email": "user1@example.com",
  "phone": "0901234567",
  "address": "123 Đường ABC, Phường XYZ",
  "city": "TP. Hồ Chí Minh",
  "postalCode": "700000",
  "shippingMethod": "standard",
  "paymentMethod": "credit_card",
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "price": 199000
    }
  ]
}

Response: {
  "success": true,
  "message": "Tạo đơn hàng thành công",
  "order": {
    "id": "order_123456",
    "orderNumber": "ORD-20260410-001",
    "status": "pending",
    "total": 470800,
    "createdAt": "2026-04-10T12:34:56Z",
    "estimatedDelivery": "2026-04-15"
  }
}
```

### 5.2 Lấy Danh Sách Đơn Hàng
```
GET /orders?status=pending&page=1

Authorization: Bearer <token>

Response: {
  "success": true,
  "orders": [
    {
      "id": "order_123456",
      "orderNumber": "ORD-20260410-001",
      "status": "pending",
      "total": 470800,
      "itemsCount": 2,
      "createdAt": "2026-04-10T12:34:56Z"
    }
  ]
}
```

### 5.3 Chi Tiết Đơn Hàng
```
GET /orders/:orderId
Authorization: Bearer <token>

Response: {
  "success": true,
  "order": {
    "id": "order_123456",
    "orderNumber": "ORD-20260410-001",
    "status": "shipped",
    "items": [...],
    "shipping": {...},
    "total": 470800,
    "trackingNumber": "TRACK123456789"
  }
}
```

---

## 6. **Error Handling (Xử Lý Lỗi)**

### Mã Lỗi Chung:
```json
{
  "success": false,
  "error": "Invalid credentials",
  "code": "AUTH_001",
  "statusCode": 401
}
```

### Các Mã Lỗi Thường Gặp:
| Code | Status | Ý Nghĩa |
|------|--------|---------|
| AUTH_001 | 401 | Email hoặc mật khẩu không đúng |
| AUTH_002 | 409 | Email đã tồn tại |
| PRODUCT_001 | 404 | Sản phẩm không tồn tại |
| CART_001 | 400 | Hết hàng |
| ORDER_001 | 400 | Không thể tạo đơn hàng |
| PAYMENT_001 | 402 | Thanh toán thất bại |

---

## 7. **Headers Yêu Cầu**

```
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN>
User-Agent: TPNQT-Shop/1.0
Accept: application/json
```

---

## 8. **Ví Dụ Thực Tế - JavaScript/Fetch**

### Đăng Nhập:
```javascript
const login = async (email, password) => {
  const response = await fetch('https://api.lehuuminhquan.id.vn/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
  
  if (!response.ok) {
    throw new Error('Đăng nhập thất bại');
  }
  
  const data = await response.json();
  localStorage.setItem('token', data.token);
  return data.user;
};
```

### Lấy Giỏ Hàng:
```javascript
const getCart = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch('https://api.lehuuminhquan.id.vn/cart', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  
  return await response.json();
};
```

### Tạo Đơn Hàng:
```javascript
const createOrder = async (orderData) => {
  const token = localStorage.getItem('token');
  const response = await fetch('https://api.lehuuminhquan.id.vn/orders/create', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderData)
  });
  
  return await response.json();
};
```

---

## 9. **Rate Limiting**

- **Giới hạn**: 100 requests/phút per IP
- **Headers trả về**:
  - `X-RateLimit-Limit`: 100
  - `X-RateLimit-Remaining`: 95
  - `X-RateLimit-Reset`: 1681234567

---

## 10. **Testing Tips**

✅ Dùng **Postman** hoặc **Thunder Client** để test API
✅ Luôn include **Authorization header** (ngoài login/register)
✅ Check **Network tab** trong DevTools (F12)
✅ Log **response** để debug

---

**Happy API Calling! 🚀**
