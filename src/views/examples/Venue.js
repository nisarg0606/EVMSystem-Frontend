import React, { useEffect, useState } from 'react';
import {
  Card, Container, Spinner, Button, Row, Col, Input, Form,
  FormGroup,
  Label,
  Alert, Modal, ModalBody, ModalFooter, ModalHeader
} from 'reactstrap';
import CardMain from 'components/CardMain/CardMain';
import DemoNavbar from 'components/Navbars/DemoNavbar';
import SimpleFooter from 'components/Footers/SimpleFooter';
import fetchVenues from '../../utils/FetchVenues';
import createVenue from '../../utils/CreateVenue';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GetMyVenues from '../../utils/MyVenues';
const Venue = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [venuesPerPage] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [venueData, setVenueData] = useState({
    name: "",
    description: "",
    capacity: 0,
    location: "",
    image: null,
    type: "",
    price: 0,
    timings: [],
  });
  const toggle = () => setModal(!modal);

  const [newDay, setNewDay] = useState("");
  const [newSlot, setNewSlot] = useState({ from: "", to: "" });
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    if (newDay) {
      const dayExists = venueData.timings.some((day) => day.day === newDay);
      if (!dayExists) {
        setVenueData({
          ...venueData,
          timings: [...venueData.timings, { day: newDay, slots: [] }],
        });
      }
    }
  }, [newDay]);

  const handleRemoveSlot = (dayIndex, slotIndex) => {
    const updatedTimings = [...venueData.timings];
    updatedTimings[dayIndex].slots.splice(slotIndex, 1);
    setVenueData({
      ...venueData,
      timings: updatedTimings,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenueData({
      ...venueData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setVenueData({
      ...venueData,
      image: file,
    });
  };



  const handleAddSlot = (dayIndex) => {
    const updatedTimings = [...venueData.timings];
    updatedTimings[dayIndex].slots.push(newSlot);
    setVenueData({
      ...venueData,
      timings: updatedTimings,
    });
    setNewSlot({ from: "", to: "" });
  };

  const handleSubmit = async (venueData) => {
    try {
      setModalLoading(true);

      const response = await createVenue(venueData);
      console.log(response);
      toast.success("Venue Created successfully");

    } catch (error) {
      console.error("Error creating venue:", error);
      toast.error("Failed to Created venue", error);

    } finally {
      setModalLoading(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const venuesResponse = await GetMyVenues();
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
    setModal(true);
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
                  {userRole !== 'customer' && (
                    <Button onClick={handleCreateVenue} className="mr-2 tw-text-white">
                      Create Venue
                    </Button>
                  )}
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
                        imageSrc={result.imageURL}
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
                        imageSrc={venue.imageURL}
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
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle} >Create Venue</ModalHeader>
        <ModalBody className="tw-bg-white">
          {modalLoading ? (
            <div className="text-center">
              <p>Loading...</p>
              <Spinner color="primary" style={{ width: '3rem', height: '3rem' }} />
            </div>
          ) : (
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="name">Name:</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={venueData.name}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="description">Description:</Label>
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  value={venueData.description}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="capacity">Capacity:</Label>
                <Input
                  type="number"
                  name="capacity"
                  id="capacity"
                  value={venueData.capacity}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="location">Location:</Label>
                <Input
                  type="text"
                  name="location"
                  id="location"
                  value={venueData.location}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="type">Type:</Label>
                <Input
                  type="text"
                  name="type"
                  id="type"
                  value={venueData.type}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="price">Price Per Hour:</Label>
                <Input
                  type="number"
                  name="price"
                  id="price"
                  value={venueData.price}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="newDay">Select Day:</Label>
                <Input
                  type="select"
                  name="newDay"
                  id="newDay"
                  value={newDay}
                  onChange={(e) => setNewDay(e.target.value)}
                >
                  <option value="">Select Day</option>
                  <option value="monday">Monday</option>
                  <option value="tuesday">Tuesday</option>
                  <option value="wednesday">Wednesday</option>
                  <option value="thursday">Thursday</option>
                  <option value="friday">Friday</option>
                  <option value="saturday">Saturday</option>
                  <option value="sunday">Sunday</option>
                </Input>
              </FormGroup>

              {venueData.timings.map((day, dayIndex) => (
                <div key={dayIndex}>
                  <h4>{day.day}</h4>
                  {day.slots.map((slot, slotIndex) => (
                    <div key={slotIndex}>
                      <Input
                        type="text"
                        value={slot.from}
                        onChange={(e) => {
                          const updatedTimings = [...venueData.timings];
                          updatedTimings[dayIndex].slots[slotIndex].from = e.target.value;
                          setVenueData({
                            ...venueData,
                            timings: updatedTimings,
                          });
                        }}
                        placeholder="From"
                      />
                      {" - "}
                      <Input
                        type="text"
                        value={slot.to}
                        onChange={(e) => {
                          const updatedTimings = [...venueData.timings];
                          updatedTimings[dayIndex].slots[slotIndex].to = e.target.value;
                          setVenueData({
                            ...venueData,
                            timings: updatedTimings,
                          });
                        }}
                        placeholder="To"
                      />

                      <Button color="danger" className='tw-text-black tw-mt-2 mb-2' onClick={() => handleRemoveSlot(dayIndex, slotIndex)}>
                        Remove Slot
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    color="primary"
                    className='tw-text-black'
                    onClick={() => handleAddSlot(dayIndex)}
                  >
                    Add Slot
                  </Button>
                </div>
              ))}
              <FormGroup>
                <Label for="image">Image:</Label>
                <Input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </FormGroup>
            </Form>
          )}
        </ModalBody>
        <ModalFooter className="tw-bg-gray-200">
          <Button color="tw-primary" onClick={() => handleSubmit(venueData)} className="tw-hover:bg-blue-700 tw-text-black tw-font-bold tw-py-1 tw-px-2 tw-rounded mr-2">Submit</Button>{' '}
          <Button color="tw-secondary" onClick={toggle} className="tw-hover:bg-gray-400 tw-text-gray-700 tw-font-bold tw-py-1 tw-px-2 tw-rounded">Cancel</Button>
        </ModalFooter>
      </Modal>
      <ToastContainer />

    </>
  );
};

export default Venue;
