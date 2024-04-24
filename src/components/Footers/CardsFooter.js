import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import GetAllActivities from "../../utils/GetAllActivites.js";
import GetAllVenues from "../../utils/GetAllVenues.js";
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
  Spinner // Import Spinner component from Reactstrap
} from "reactstrap";

const CardsFooter = () => {
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState([]);
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('token');
  
        const activitiesResponse = await GetAllActivities();
        setActivities(activitiesResponse);
  
        const venuesResponse = await GetAllVenues();
        setVenues(Object.values(venuesResponse.venues));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  return (
    <footer className="footer has-cards">
      {loading ? (
        <div className="text-center"> 
        <p>Loading...</p>
          <Spinner color="primary" style={{ width: '3rem', height: '3rem' }} /> 
        </div>
      ) : (
        <Container className="container-lg">
          <Row>
            <Col className="mb-5 mb-md-0" md="6">
              <Card className="card-lift--hover shadow border-0">
                <h1>Venues</h1>
                <ul>
                  {venues.map(venue => (
                    <li key={venue._id}>
                      <h2>{venue.name}</h2>
                      <p>{venue.description}</p>
                      <p>Location: {venue.location}</p>
                      <p>Capacity: {venue.capacity}</p>
                    </li>
                  ))}
                </ul>
              </Card>
            </Col>
            <Col className="mb-5 mb-lg-0" md="6">
              <Card className="card-lift--hover shadow border-0">
                <h1> Upcomming Activities</h1>
                <ul>
                  {activities.map(activity => (
                    <li key={activity._id}>
                      <h2>{activity.name}</h2>
                      <p>{activity.description}</p>
                      <p>Location: {activity.venue.location}</p>
                      <p>Capacity: {activity.participants_limit}</p>
                    </li>
                  ))}
                </ul>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
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
              <a href="#" target="_blank" rel="noopener noreferrer">
                EVM-System
              </a>
              .
            </div>
          </Col>
          <Col md="6">
            <Nav className="nav-footer justify-content-end">
              <NavItem>
                <NavLink href="#" target="_blank" rel="noopener noreferrer">
                  EVM-System
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" target="_blank" rel="noopener noreferrer">
                  About Us
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default CardsFooter;
