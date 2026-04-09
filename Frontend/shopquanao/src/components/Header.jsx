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
    <header className="header-section">
      <nav className="navbar-menu">
        <Container>
          <div className="d-flex justify-content-between align-items-center">
            <Link to="/" className="navbar-brand">
              <strong style={{ fontSize: "24px", color: "#333" }}>TPNQT</strong>
            </Link>
            
            <Nav className="main-menu">
              <Nav.Link as={Link} to="/" style={{ color: 'white' }}>Trang chủ</Nav.Link>
              <Nav.Link as={Link} to="/categories" style={{ color: 'white' }}>Sản phẩm</Nav.Link>
              <Nav.Link href="#" style={{ color: 'white' }}>Về chúng tôi</Nav.Link>
              <Nav.Link href="#" style={{ color: 'white' }}>Liên hệ</Nav.Link>
            </Nav>

            <Nav className="nav-top-icons">
              {isAuthenticated ? (
                <Dropdown>
                  <Dropdown.Toggle style={{ background: 'none', border: 'none', color: 'white' }}>
                    <FaUser className="me-2" />
                    {user?.name}
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
                  <Nav.Link as={Link} to="/login" style={{ color: 'white' }}>Đăng nhập</Nav.Link>
                  <Nav.Link as={Link} to="/register" style={{ color: 'white' }}>Đăng ký</Nav.Link>
                </>
              )}
              <Nav.Link as={Link} to="/cart" style={{ position: 'relative', color: 'white' }}>
                <FaShoppingCart />
                {getTotalItems() > 0 && (
                  <Badge bg="danger">{getTotalItems()}</Badge>
                )}
              </Nav.Link>
            </Nav>
          </div>
        </Container>
      </nav>
    </header>
  );
}
