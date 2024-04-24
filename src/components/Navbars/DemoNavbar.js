import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
// reactstrap components
import {
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

const DemoNavbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [collapseClasses, setCollapseClasses] = useState("");
  const [collapseOpen, setCollapseOpen] = useState(false);

  useEffect(() => {
    const headroom = new Headroom(document.getElementById("navbar-main"));
    headroom.init();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.clear();
    window.location.href = "/login-page";
    setIsAuthenticated(false);
  };

  const onExiting = () => {
    setCollapseClasses("collapsing-out");
  };

  const onExited = () => {
    setCollapseClasses("");
  };

  const userRole = localStorage.getItem('role')

  return (
    <>
      <header className="header-global">
        <Navbar
          className="navbar-main navbar-transparent navbar-light headroom"
          expand="lg"
          id="navbar-main"
        >
          <Container>
            <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
              <img alt="..." src={require("assets/img/brand/EVMlogo.png")} />
            </NavbarBrand>
            <button className="navbar-toggler" id="navbar_global">
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse
              toggler="#navbar_global"
              navbar
              className={collapseClasses}
              onExiting={onExiting}
              onExited={onExited}
            >
              <div className="navbar-collapse-header">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <Link to="/">
                      <img alt="..." src={require("assets/img/brand/EVMlogo.png")} />
                    </Link>
                  </Col>
                  <Col className="collapse-close" xs="6">
                    <button className="navbar-toggler" id="navbar_global">
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>
              <Nav className="align-items-lg-center ml-lg-auto" navbar>
                {isAuthenticated ? (
                  <>
                  <NavItem>
                      <NavLink>
                        <Link to="/home" className="nav-link">
                          <span className="nav-link-inner--text">Home</span>
                        </Link>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink>
                        <Link to="/activity" className="nav-link">
                          <span className="nav-link-inner--text">Activities</span>
                        </Link>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink>
                        <Link to="/venue" className="nav-link">
                          <span className="nav-link-inner--text">Venue</span>
                        </Link>
                      </NavLink>
                    </NavItem>
                    {userRole === 'customer' && (
                      <NavItem>
                        <NavLink>
                          <Link to="/peoples" className="nav-link">
                            <span className="nav-link-inner--text">Peoples</span>
                          </Link>
                        </NavLink>
                      </NavItem>
                    )}
                  </>
                ) : (
                  <>
                    <NavItem>
                      <NavLink>
                        <Link to="/register" className="nav-link">
                          <span className="nav-link-inner--text">Register</span>
                        </Link>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink>
                        <Link to="/login" className="nav-link">
                          <span className="nav-link-inner--text">Login</span>
                        </Link>
                      </NavLink>
                    </NavItem>
                  </>
                )}
              </Nav>
              <Nav className="align-items-lg-center ml-lg-auto" navbar>
                {isAuthenticated && (
                  <>
                    <NavItem>
                      <NavLink>
                        <Link to="/profile" className="nav-link">
                          <span className="nav-link-inner--text">Profile</span>
                        </Link>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink>
                        <Link onClick={handleLogout} className="nav-link">
                          <span className="nav-link-inner--text">Logout</span>
                        </Link>
                      </NavLink>
                    </NavItem>
                  </>
                )}
              </Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default DemoNavbar;
