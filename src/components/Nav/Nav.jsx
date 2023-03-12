import React from "react";
import { Navbar, Container } from "react-bootstrap";
// import { ReactComponent as Logo } from "../icons/logo.svg";
import { ReactComponent as Logo } from "../../icons/logo.svg";
import "./Nav.css";

export default function Nav() {


  return (
    <Navbar fixed="top">
      <div className="nav-container">
        <Navbar.Brand>
          <Logo
            height=".75in"
            className="d-inline-block align-top logo" />
        </Navbar.Brand>
      </div>
    </Navbar>
  )
}

