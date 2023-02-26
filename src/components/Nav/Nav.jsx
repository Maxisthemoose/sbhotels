import React from "react";
import { Navbar, Container } from "react-bootstrap";
// import { ReactComponent as Logo } from "../icons/logo.svg";
import logo from "../../icons/logo.svg";
import "./Nav.css";

export default class Nav extends React.Component {

  componentDidMount() {

  }

  render() {
    return (
      <Navbar fixed="top">
        <div className="nav-container">
          <Navbar.Brand>
            <img
              alt=""
              src={logo}
              height=".75in"
              className="d-inline-block align-top logo"
            />
          </Navbar.Brand>
        </div>
      </Navbar>
    )
  }

}