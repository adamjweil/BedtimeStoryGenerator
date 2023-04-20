import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BookHalf } from 'react-bootstrap-icons';

const NavigationBar = () => {
  return (
    <Navbar bg="light" expand="md">
      <Navbar.Brand as={Link} to="/">
        <BookHalf style={{ marginRight: '5px' }} />
        Bedtime Story Generator
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="mr-auto">
           <Nav.Link as={Link} to="/">Home</Nav.Link>
         </Nav>
         <Nav className="mr-auto">
           <Nav.Link as={Link} to="/my_stories">My Stories</Nav.Link>
         </Nav>
       </Navbar.Collapse>
     </Navbar>
   );
};

export default NavigationBar;
