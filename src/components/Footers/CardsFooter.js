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
  Spinner
} from "reactstrap";
import CardMain from "../../components/CardMain/CardMain.js";


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
          <Card className="p-4 mb-4">
            <Row>
              <Col className="mb-5 mb-md-0" md="6">
                <h1>Venues</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {venues.map(venue => (
                    <CardMain
                      key={venue._id}
                      imageSrc={venue.imagesURL[0]}
                      title={venue.name}
                      capacity={`Capacity: ${venue.capacity}, Location: ${venue.location}, Type: ${venue.type}, Price Per Hour: ${venue.pricePerHour}`}
                      availability={venue.availability}
                      description={`${venue.description} Location: ${venue.location} Capacity: ${venue.capacity}`}
                      location={`Location: ${venue.location}`}
                      venueOwner={`Venue Owner: ${venue.venueOwner.username}`}
                      venueOwnerEmail={`Owner Email: ${venue.venueOwner.email}`}
                    />
                  ))}
                </div>
              </Col>
              <Col className="mb-5 mb-lg-0" md="6">
                  <h1> Upcoming Activities</h1>
                  <ul>
                    {activities.map(activity => (
                      <CardMain
                        key={activity._id}
                        imageSrc={activity.imagesURL[0]} 
                        title={activity.name}
                        activityType={`Activity : ${activity.type_of_activity}`}
                        description={`${activity.description} Location: ${activity.venue.location} Capacity: ${activity.participants_limit}`}
                        location={`Location : ${activity.venue.location}`}
                      />
                    ))}
                  </ul>
              </Col>
            </Row>
          </Card>
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
