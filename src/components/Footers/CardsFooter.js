import React, { useEffect ,useState} from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardImg,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import GetAllActivites from "utils/GetAllActivites";
const CardsFooter = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Function to fetch data from API
    const fetchData = async () => {
      try {
        const data = await GetAllActivites(); // Call getAllActivites function
        setActivities(data); // Set fetched data to state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetch function when component mounts
  }, []); // Empty array means it runs only once on mount


  return (
    <>
      <footer className="footer has-cards">
        <Container className="container-lg">
          <Row>
            {/* Render cards with fetched data */}
            {activities.map((activity, index) => (
              <Col key={index} className="mb-5 mb-md-0" md="6">
                <Card className="card-lift--hover shadow border-0">
                  <div className="card-back">
                    <p>{activity.text}</p> {/* Assuming text is a property in your activity object */}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
        <Container>
          <Row className="row-grid align-items-center my-md">
            <Col lg="6">
              <h3 className="text-primary font-weight-light mb-2">
                Thank you for visiting us!
              </h3>
              <h4 className="mb-0 font-weight-light">
                Let's plan an event together
              </h4>
            </Col>
          </Row>
          <hr />
          <Row className="align-items-center justify-content-md-between">
            <Col md="6">
              <div className="copyright">
                © {new Date().getFullYear()}{" "}
                <a href="#" target="_blank">
                  EVM-System
                </a>
                .
              </div>
            </Col>
            <Col md="6">
              <Nav className="nav-footer justify-content-end">
                <NavItem>
                  <NavLink href="#" target="_blank">
                    EVM-System
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#" target="_blank">
                    About Us
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default CardsFooter;
