import { Nav, Container, Dropdown, Badge } from "react-bootstrap";
import { FaShoppingCart, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const { getTotalItems } = useCart();

  return (
    <header className="header-section site-header">
      <nav className="navbar-menu navbar navbar-expand-lg navbar-light bg-white">
        <Container>
          <div className="d-flex justify-content-between align-items-center w-100">
            <Link to="/" className="navbar-brand site-logo">
              <strong style={{ fontSize: "24px", color: "#000", border: '1px solid #000', padding: '4px 8px' }}>TPNQT</strong>
            </Link>

            <Nav className="main-menu">
              <Nav.Link as={Link} to="/" className="menu-item">Trang chủ</Nav.Link>
              <Nav.Link as={Link} to="/categories" className="menu-item">Sản phẩm</Nav.Link>
              <Nav.Link href="#" className="menu-item">Về chúng tôi</Nav.Link>
              <Nav.Link href="#" className="menu-item">Liên hệ</Nav.Link>
            </Nav>

            <Nav className="nav-top-icons">
              {isAuthenticated ? (
                <Dropdown>
                  <Dropdown.Toggle className="dropdown-toggle-plain">
                    <FaUser className="me-2 icon-outline" />
                    <span className="ms-2">{user?.name}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={logout}>
                      <FaSignOutAlt className="me-2" />
                      Đăng xuất
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login" className="menu-item">Đăng nhập</Nav.Link>
                  <Nav.Link as={Link} to="/register" className="menu-item">Đăng ký</Nav.Link>
                </>
              )}

              <Nav.Link as={Link} to="/cart" className="cart-link menu-item">
                <FaShoppingCart className="me-2" style={{ color: '#000' }} />
                {getTotalItems() > 0 && (
                  <Badge className="cart-badge bg-dark text-white">{getTotalItems()}</Badge>
                )}
              </Nav.Link>
            </Nav>
          </div>
        </Container>
      </nav>
    </header>
  );
}
