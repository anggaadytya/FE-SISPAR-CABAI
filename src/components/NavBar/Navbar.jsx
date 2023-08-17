import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Navbar.css";

import { Link } from "react-router-dom";

function BasicExample() {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand
          href="/"
          className="fw-bold fs-3 d-flex justify-content-center mt-2"
        >
          <span className="span1">SISPAR</span>
          <span className="span2">CABAI</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center fw-bold judul">
            <Link style={{ textDecoration: "none" }} to="/">
              <Nav className="nav-link">Home</Nav>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/deteksi">
              <Nav className="nav-link">Deteksi</Nav>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/informasi">
              <Nav className="nav-link">Informasi</Nav>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/about">
              <Nav className="nav-link">About</Nav>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/auth/login">
              <Nav>
                <button className="btn1 rounded-4 ">Login</button>
              </Nav>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
