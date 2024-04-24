import React, { useEffect, useState } from 'react';
import { Card, Container, Spinner, Button, Row, Col, Input } from 'reactstrap';
import CardMain from 'components/CardMain/CardMain';
import DemoNavbar from 'components/Navbars/DemoNavbar';
import SimpleFooter from 'components/Footers/SimpleFooter';
import fetchVenues from '../../utils/FetchVenues';
import CreateVenueModal from '../../components/CardMain/venue/CreateVenueModal.js';
import CreateVenue from '../../utils/CreateVenue';

const Venue = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [venuesPerPage] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const venuesResponse = await fetchVenues();
        setVenues(Object.values(venuesResponse.venues));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateVenue = () => {
    setModalOpen(true);
  };

  const handleSubmitVenue = async (venueData) => {
    try {
      const createVenue = await CreateVenue(venueData);
    } catch (error) {
      console.error('Error creating venue:', error.message);
    }
  };

  const handleSearchButtonClick = async () => {
    if (searchQuery.trim() !== '') {
      try {
        const results = await fetchVenues(searchQuery, searchQuery);
        setSearchResults(Object.values(results.venues));
      } catch (error) {
        console.error("Error searching venues:", error.message);
      }
    }
  };

  const handleClearSearch = async () => {

    setSearchQuery('');
    setSearchResults([]);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const venuesResponse = await fetchVenues();
        setVenues(Object.values(venuesResponse.venues));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery === '') {
      fetchData();
    }
  }, [searchQuery]);

  const indexOfLastVenue = currentPage * venuesPerPage;
  const indexOfFirstVenue = indexOfLastVenue - venuesPerPage;
  const currentVenues = searchQuery ? searchResults.slice(indexOfFirstVenue, indexOfLastVenue) : venues.slice(indexOfFirstVenue, indexOfLastVenue);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <DemoNavbar />
      <main className="profile-page">
        <section className="section-profile-cover section-shaped my-0">
          {/* Circles background */}
          {/* <iframe src='https://my.spline.design/3dtextbluecopy-e0ebfe5a55bf0182a2fd7acd1217991c/' frameborder='0' width='100%' height='100%'></iframe> */}
          {/* <iframe src='https://my.spline.design/3dtextbluecopy-395969798f2e0f678112143bc75ac6e0/' frameborder='0' width='100%' height='100%'></iframe> */}
          <div className="shape shape-style-1 shape-default alpha-4">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <Container className="shape-container d-flex align-items-center py-lg ">
            <div className="col px-0">
              <Row className="align-items-center justify-content-center">
                <Col className="tw-mx-auto tw-text-center" lg="10">
                  <h1 className="tw-text-xl lg:tw-text-2xl tw-font-serif tw-font-bold tw-text-center tw-text-gray-800 tw-my-4">VENUES</h1>
                </Col>
              </Row>
            </div>
          </Container>
          {/* SVG separator */}
          <div className="separator separator-bottom separator-skew">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon className="fill-white" points="2560 0 2560 100 0 100" />
            </svg>
          </div>
        </section>

        <section className="section">
          {loading ? (
            <div className="text-center">
              <p>Loading...</p>
              <Spinner color="primary" style={{ width: '3rem', height: '3rem' }} />
            </div>
          ) : (
            <Container>
              <Card className="card-profile shadow mt--300 rounded">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-blue p-4">
                  <div className="tw-flex tw-justify-between -tw-items-center">
                    <Button onClick={handleCreateVenue} className="mr-2 tw-text-white">
                      Create Venue
                    </Button>
                    <div className="tw-flex items-center">
                      <Input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name or description"
                        className="mr-2"
                      />
                      <Button onClick={handleSearchButtonClick} className="mr-2 tw-text-white" >
                        Search
                      </Button>
                      {searchQuery && ( 
                        <Button onClick={handleClearSearch} className="mr-2 tw-text-white">
                          Clear
                        </Button>
                      )}
                    </div>
                  </div>

                  <h1 className='text-xl lg:text-2xl font-serif font-bold text-center text-white my-4'></h1>
                  {searchResults.length > 0 ? (
                    searchResults.map(result => (
                      <CardMain
                        key={result._id}
                        imageSrc={result.imagesURL[0]}
                        title={result.name}
                        capacity={`Capacity: ${result.capacity}, Location: ${result.location}, Type: ${result.type}, Price Per Hour: ${result.pricePerHour}`}
                        availability={result.availability}
                        description={`${result.description} Location: ${result.location} Capacity: ${result.capacity}`}
                        location={`Location: ${result.location}`}
                        // venueOwner={`Venue Owner: ${result.venueOwner.username}`}
                        venueOwnerEmail={`Owner Email: ${result.venueOwner.email}`}
                        cardType={'venue'}
                        id={result._id}
                      />
                    ))
                  ) : (
                    currentVenues.map(venue => (
                      <CardMain
                        key={venue._id}
                        imageSrc={venue.imagesURL[0]}
                        title={venue.name}
                        capacity={`Capacity: ${venue.capacity}, Location: ${venue.location}, Type: ${venue.type}, Price Per Hour: ${venue.pricePerHour}`}
                        availability={venue.availability}
                        description={`${venue.description} Location: ${venue.location} Capacity: ${venue.capacity}`}
                        location={`Location: ${venue.location}`}
                        // venueOwner={`Venue Owner: ${venue.venueOwner.username}`}
                        venueOwnerEmail={`Owner Email: ${venue.venueOwner.email}`}
                        cardType={'venue'}
                        id={venue._id}
                      />
                    ))
                  )}

                </div>
              </Card>
              {/* Pagination */}
              <nav className="mt-4">
                <ul className="pagination justify-content-center">
                  {[...Array(Math.ceil(venues.length / venuesPerPage)).keys()].map((number) => (
                    <li key={number} className="page-item">
                      <Button onClick={() => paginate(number + 1)} className="page-link">
                        {number + 1}
                      </Button>
                    </li>
                  ))}
                </ul>
              </nav>
            </Container>
          )}
        </section>
      </main>
      <SimpleFooter />

      {/* Create Venue Modal */}
      <CreateVenueModal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)} handleSubmit={handleSubmitVenue} />
    </>
  );
};

export default Venue;
