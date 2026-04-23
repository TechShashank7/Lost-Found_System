import React, { useContext } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { PackageSearch, LogOut } from 'lucide-react';

const AppNavbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0,2) : '?';
  };

  return (
    <Navbar className="modern-navbar" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <PackageSearch className="brand-icon me-2" size={28} />
          <span>Lost<span style={{ color: '#2563eb' }}>&</span>Found</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center gap-3">
            {user ? (
              <>
                <Nav.Link as={Link} to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
                  Dashboard
                </Nav.Link>
                
                <div className="user-pill d-none d-lg-flex">
                  <div className="user-avatar">
                    {getInitials(user.name)}
                  </div>
                  <span className="fw-medium text-dark pe-2" style={{ fontSize: '0.95rem' }}>{user.name}</span>
                </div>
                
                <button onClick={handleLogout} className="btn btn-outline-danger btn-sm rounded-pill px-3">
                  <LogOut size={16} className="me-1" /> Logout
                </button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Nav.Link>
                <Link to="/register" className="btn btn-primary rounded-pill px-4">Register</Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
