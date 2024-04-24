import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import GetAllActivities from "../../utils/GetAllActivites.js";
import GetAllVenues from "../../utils/GetAllVenues.js";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Spinner
} from "reactstrap";
import CardMain from "../../components/CardMain/CardMain.js";

const CardsFooter = () => {
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState([]);
  const [venues, setVenues] = useState([]);
  const [venuesCurrentPage, setVenuesCurrentPage] = useState(1);
  const [activitiesCurrentPage, setActivitiesCurrentPage] = useState(1);
  const itemsPerPage = 2;

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

  const venuesIndexOfLastItem = venuesCurrentPage * itemsPerPage;
  const venuesIndexOfFirstItem = venuesIndexOfLastItem - itemsPerPage;
  const currentVenues = venues.slice(venuesIndexOfFirstItem, venuesIndexOfLastItem);

  const activitiesIndexOfLastItem = activitiesCurrentPage * itemsPerPage;
  const activitiesIndexOfFirstItem = activitiesIndexOfLastItem - itemsPerPage;
  const currentActivities = activities.slice(activitiesIndexOfFirstItem, activitiesIndexOfLastItem);

  const paginateVenues = (pageNumber) => setVenuesCurrentPage(pageNumber);

  const paginateActivities = (pageNumber) => setActivitiesCurrentPage(pageNumber);

  return (
    <footer className="footer has-cards">
      {loading ? (
        <div className="text-center">
          <p>Loading...</p>
          <Spinner
            color="primary"
            style={{
              height: '3rem',
              width: '3rem'
            }}
            type="grow"
          >
            Loading...
          </Spinner>
        </div>
      ) : (
        <Container className="container-lg section-hero section-shaped">
          <Card className="p-4 mb-4 bg-blue ">
            <Row>
              <Col className="mb-5 mb-md-0" md="6">
                <h1 className="tw-text-xl lg:tw-text-2xl tw-font-serif tw-font-bold tw-text-center tw-text-white tw-my-4">Venues</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentVenues.map(venue => (
                    <CardMain
                      key={venue._id}
                      imageSrc={venue.imageURL}
                      title={venue.name}
                      id={venue._id}
                      capacity={`Capacity: ${venue.capacity}, Location: ${venue.location}, Type: ${venue.type}, Price Per Hour: ${venue.pricePerHour}`}
                      availability={venue.availability}
                      description={`${venue.description} Location: ${venue.location} Capacity: ${venue.capacity}`}
                      location={`Location: ${venue.location}`}
                      // venueOwner={`Venue Owner: ${venue.venueOwner.name}`}
                      venueOwnerEmail={`Owner Email: ${venue.venueOwner.email}`}
                      price={`${venue.pricePerHour}`}
                      cardType={'venue'}
                      
                    />
                  ))}
                </div>
                {/* Pagination for venues */}
                <nav className="mt-4">
                  <ul className="pagination justify-content-center">
                    {[...Array(Math.ceil(venues.length / itemsPerPage)).keys()].map((number) => (
                      <li key={number} className="page-item">
                        <Button onClick={() => paginateVenues(number + 1)} className="page-link text-white">
                          {number + 1}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </Col>
              <Col className="mb-5 mb-lg-0" md="6">
                <h1 className="tw-text-xl lg:tw-text-2xl tw-font-serif tw-font-bold tw-text-center tw-text-white tw-my-4">Upcoming Activities</h1>
                <ul>
                  {currentActivities.map(activity => (
                    <CardMain
                      key={activity._id}
                      imageSrc={activity.imageURL}
                      title={activity.name}
                      id={activity._id}
                      date={activity.date}
                      Price={activity.price}
                      time={activity.start_time}
                      status={activity.status}
                      activityType={`Activity : ${activity.type_of_activity}`}
                      description={`${activity.description} Location: ${activity.venue ? activity.venue.location : 'Unknown location'} Capacity: ${activity.participants_limit}`}
                      cardType={'activity'}
                      price={activity.price}
                    />
                  ))}

                </ul>
                {/* Pagination for activities */}
                <nav className="mt-4">
                  <ul className="pagination justify-content-center">
                    {[...Array(Math.ceil(activities.length / itemsPerPage)).keys()].map((number) => (
                      <li key={number} className="page-item">
                        <Button onClick={() => paginateActivities(number + 1)} className="page-link text-white">
                          {number + 1}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </Col>
            </Row>
          </Card>
        </Container>
      )}
    </footer>
  );
};

export default CardsFooter;
