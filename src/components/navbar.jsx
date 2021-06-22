import React from 'react';
import { Nav, NavDropdown, Navbar } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import logo from '../images/logovtq.png'
import {

  Link,

} from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux';
import {LogOut} from '../redux/actionMethodes/User/index'

export default function NavBar ({ hasback }) {
  const user=useSelector(x=>x.User);
  const dispatch=useDispatch();

  const logOutNow=async ()=>{
    dispatch(LogOut());
  }
  return<Fade top>{ hasback && hasback === true ? <Navbar bg="dark" className="pd6p" collapseOnSelect expand="lg" variant="dark">
    <Navbar.Brand as={Link} to="/"><img src={logo} alt='img'/></Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">

      </Nav>
      <Nav>
        <NavDropdown title="Explore" id="collasible-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Property</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Cars</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Furniture</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.4">Market Place</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link as={Link} to="/blogs"> Blogs</Nav.Link>
        <Nav.Link as={Link} to="/market">Marketplace</Nav.Link>

       {
         user!=null?<></>
         : <Nav.Link as={Link} to="/login">Sign in</Nav.Link>
       }
       {
         user!=null?<Nav.Link as={Link} onClick={()=>logOutNow()} >Log out</Nav.Link>
         :<Nav.Link as={Link} to="/register">Register</Nav.Link>
       }
        <Nav.Link as={Link} to={user!=null?"/listings":"/login"} className="btn btn-info themeBackgroundColor listingbtn">Add Listing</Nav.Link>


      </Nav>
    </Navbar.Collapse>
  </Navbar> : <Navbar collapseOnSelect expand="lg" variant="dark">
      <Navbar.Brand href="#home"><img src={logo} alt='img'/></Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">

        </Nav>
        <Nav>
          <NavDropdown title="Explore" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Property</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Cars</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Furniture</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Market Place</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link as={Link} to="/blogs"> Blogs</Nav.Link>
          <Nav.Link as={Link} to="/market">Marketplace</Nav.Link>
          {
         user!=null?<></>
         : <Nav.Link as={Link} to="/login">Sign in</Nav.Link>
       }
       {
         user!=null?<Nav.Link as={Link} onClick={()=>logOutNow()}>Log out</Nav.Link>
         :<Nav.Link as={Link} to="/register">Register</Nav.Link>
       } <Nav.Link as={Link} to={user!=null?"/listings":"/login"}className="btn btn-info themeBackgroundColor listingbtn">Add Listing</Nav.Link>

        </Nav>
      </Navbar.Collapse>
    </Navbar>
    }</Fade>

}