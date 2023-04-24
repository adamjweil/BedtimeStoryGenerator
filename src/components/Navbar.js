import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { BookHalf } from 'react-bootstrap-icons';

const NavigationBar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');

  };

  return (
    <Navbar bg="light" expand="md">
      <Navbar.Brand as={Link} to="/">
        <BookHalf style={{ marginRight: '5px' }} />
        Bedtime Story Generator
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
       <Nav className="ms-auto">
          {user ? (
            <>
              <Nav.Link as={Link} to="/my-account">
                My Account
              </Nav.Link>
              <Nav.Link onClick={handleLogout}>Sign Out</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
            </>
          )}
        </Nav>
       </Navbar.Collapse>
     </Navbar>
   );
};

export default NavigationBar;
