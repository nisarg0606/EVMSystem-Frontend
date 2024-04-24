import React from "react";
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

class DemoNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
    };
  }
  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
  }
  state = {
    collapseClasses: "",
    collapseOpen: false,
  };

  onExiting = () => {
    this.setState({
      collapseClasses: "collapsing-out",
    });
  };

  onExited = () => {
    this.setState({
      collapseClasses: "",
    });
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.setState({ isAuthenticated: true });
    }
  }
  handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login-page";
    this.setState({ isAuthenticated: false });
  };
  render() {
    const { isAuthenticated } = this.state;
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
                <img
                  alt="..."
                  src={require("assets/img/brand/EVMlogo.png")}
                />
              </NavbarBrand>
              <button className="navbar-toggler" id="navbar_global">
                <span className="navbar-toggler-icon" />
              </button>
              <UncontrolledCollapse
                toggler="#navbar_global"
                navbar
                className={this.state.collapseClasses}
                onExiting={this.onExiting}
                onExited={this.onExited}
              >
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                      <Link to="/">
                        <img
                          alt="..."
                          src={require("assets/img/brand/EVMlogo.png")}
                        />
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
                  <UncontrolledDropdown>
                    <Nav className="align-items-lg-center ml-lg-auto" navbar>
                      {isAuthenticated && (
                        <>
                          <NavItem>
                            <NavLink
                              className="nav-link-icon"
                              href="https://twitter.com/creativetim"
                              id="tooltip184698705"
                              target="_blank"
                            >
                              <Link to="/activites-page" className="nav-link">
                                <span className="nav-link-inner--text">Activites</span>
                              </Link>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className="nav-link-icon"
                              href="https://twitter.com/creativetim"
                              id="tooltip184698705"
                              target="_blank"
                            >
                              <Link to="/venue-page" className="nav-link">
                                <span className="nav-link-inner--text">Venue</span>
                              </Link>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className="nav-link-icon"
                              href="https://twitter.com/creativetim"
                              id="tooltip184698705"
                              target="_blank"
                            >
                              <Link to="/peoples-page" className="nav-link">
                                <span className="nav-link-inner--text">Peoples</span>
                              </Link>
                            </NavLink>
                          </NavItem>
                        </>
                      )}
                      {!isAuthenticated && (
                      <>
                        <NavItem>

                          <NavLink
                            className="nav-link-icon"
                            href="https://twitter.com/creativetim"
                            id="tooltip184698705"
                            target="_blank"
                          >
                            <Link to="/register-page" className="nav-link">
                              <span className="nav-link-inner--text">Register</span>
                            </Link>
                          </NavLink>

                        </NavItem>
                        <NavItem>
                          <NavLink
                            className="nav-link-icon"
                            href="https://www.facebook.com/creativetim"
                            id="tooltip333589074"
                            target="_blank"
                          >
                            <Link to="/login-page" className="nav-link">
                              <span className="nav-link-inner--text">Login</span>
                            </Link>
                          </NavLink>
                        </NavItem>
                      </>
                      )}
                    </Nav>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown nav>
                  </UncontrolledDropdown>
                </Nav>
                <Nav className="align-items-lg-center ml-lg-auto" navbar>

                  <NavItem>
                    {isAuthenticated && (

                      <NavLink
                        className="nav-link-icon"
                        href="https://www.instagram.com/creativetimofficial"
                        id="tooltip356693867"
                        target="_blank"
                      >
                        <Link to="/profile-page" className="nav-link">
                          <span className="nav-link-inner--text">Profile</span>
                        </Link>
                      </NavLink>
                    )}

                  </NavItem>
                  {isAuthenticated && (
                    <NavItem>
                      <NavLink
                        className="nav-link-icon"
                        href="https://www.instagram.com/creativetimofficial"
                        id="tooltip356693867"
                        target="_blank"
                      >
                        <Link onClick={this.handleLogout} className="nav-link">
                          <span className="nav-link-inner--text">Logout</span>
                        </Link>
                      </NavLink>
                    </NavItem>
                  )}
                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }
}

export default DemoNavbar;
