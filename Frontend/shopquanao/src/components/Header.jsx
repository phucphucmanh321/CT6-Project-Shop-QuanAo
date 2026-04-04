import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser, FaList } from 'react-icons/fa';
import '../styles/Header.css';

const categories = [
  { id: 1, name: 'Áo' },
  { id: 2, name: 'Quần' },
  { id: 3, name: 'Váy' },
  { id: 4, name: 'Đầm' },
  { id: 5, name: 'Áo khoác' },
  { id: 6, name: 'Phụ kiện' },
];

export default function Header() {
  return (
    <header className="header-section">
      <Container>
        <Navbar expand="lg" className="navbar-custom py-3">
          <Navbar.Brand href="#" className="brand-logo">
            <div className="logo-placeholder">
              <span className="logo-text">Fashion</span>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto gap-3 align-items-center">
              <Nav.Link href="#" className="nav-link-item">
                <FaUser className="me-2" />
                Tài khoản
              </Nav.Link>
              <Nav.Link href="#" className="nav-link-item">
                <FaShoppingCart className="me-2" />
                Giỏ hàng (0)
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
      
      <nav className="navbar-menu">
        <Container>
          <div className="d-flex justify-content-between align-items-center">
            {/* Categories Dropdown */}
            <div className="categories-dropdown">
              <Dropdown>
                <Dropdown.Toggle variant="light" id="categories-dropdown" className="categories-btn">
                  <FaList className="me-2" />
                  Danh mục
                </Dropdown.Toggle>
                <Dropdown.Menu className="categories-menu">
                  {categories.map((cat) => (
                    <Dropdown.Item key={cat.id} href="#">
                      {cat.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {/* Main Menu */}
            <Nav className="main-menu">
              <Nav.Link href="#" className="menu-item">Trang chủ</Nav.Link>
              <Nav.Link href="#" className="menu-item">Sản phẩm</Nav.Link>
              <Nav.Link href="#" className="menu-item">Về chúng tôi</Nav.Link>
              <Nav.Link href="#" className="menu-item">Liên hệ</Nav.Link>
            </Nav>
          </div>
        </Container>
      </nav>
    </header>
  );
}
