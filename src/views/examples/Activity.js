import React, { useState, useEffect } from 'react';
import { Card, Container, Spinner, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import CardMain from 'components/CardMain/CardMain';
import DemoNavbar from 'components/Navbars/DemoNavbar';
import SimpleFooter from 'components/Footers/SimpleFooter';
import GetAllActivities from '../../utils/GetAllActivites.js';
import CreateActivity from 'utils/Profile/CreateActivity.js';

const Activity = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [activitiesPerPage] = useState(3);

    // State for modal
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);

    // State for form data
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        venue: '',
        type_of_activity: '',
        date: '',
        start_time: '',
        end_time: '',
        participants_limit: '',
        price: '',
        image: null, 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, images: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const createVenue = await CreateActivity(formData)
            console.log(createVenue)
          } catch (error) {
            console.error('Error creating Activity:', error.message);
          }
        console.log(formData);
        toggleModal();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const activitiesResponse = await GetAllActivities();
                setActivities(activitiesResponse);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Get current activities
    const indexOfLastActivity = currentPage * activitiesPerPage;
    const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
    const currentActivities = activities.slice(indexOfFirstActivity, indexOfLastActivity);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <DemoNavbar />
            <main className="profile-page">
                <section className="section-profile-cover section-shaped my-0">
                    {/* Circles background */}
                    {/* <iframe src='https://my.spline.design/3dtextbluecopy-395969798f2e0f678112143bc75ac6e0/' frameborder='0' width='100%' height='100%'></iframe> */}

                    <div className="shape shape-style-1 shape-default alpha-4">
                        <span />
                        <span />
                        <span />
                        <span />

                    </div>

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
                        <Card className="card-profile shadow mt--300">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-blue p-4">
                                <Button onClick={toggleModal} className="mr-2 tw-text-black">
                                    Create Activity
                                </Button>

                                <h1 className='tw-text-xl lg:tw-text-2xl tw-font-serif tw-font-bold tw-text-center tw-text-white tw-my-4'>Activities</h1>
                                {currentActivities.map((activity) => (
                                        <CardMain
                                            key={activity._id}
                                            // Assuming imagesURL is an array of image URLs
                                            imageSrc={activity.imagesURL[0]}
                                            title={activity.name}
                                            description={`${activity.description} Type: ${activity.type_of_activity}`}
                                            venue={`Venue: ${activity.venue ? activity.venue.name : 'To be announced'}`}
                                            activityType={`Type of Activity: ${activity.type_of_activity}`}
                                            date={`Date: ${new Date(activity.date).toLocaleDateString()}`}
                                            time={`Time: ${activity.time}`}
                                            participantsLimit={`Participants Limit: ${activity.participants_limit}`}
                                            price={`Price: $${activity.price}`}
                                            cardType={'activity'}
                                            id={activity._id}
                                        />
                                    ))}
                            </div>
                        </Card>
                        {/* Pagination */}
                        <nav className="mt-4">
                            <ul className="pagination justify-content-center">
                                {[...Array(Math.ceil(activities.length / activitiesPerPage)).keys()].map((number) => (
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
                <Modal isOpen={modal} toggle={toggleModal}>
                    <ModalHeader toggle={toggleModal}>Create Activity</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input type="text" name="name" id="name" value={formData.name} onChange={handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="description">Description</Label>
                                <Input type="text" name="description" id="description" value={formData.description} onChange={handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="venue">Venue</Label>
                                <Input type="text" name="venue" id="venue" value={formData.venue} onChange={handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="type_of_activity">Activity Type</Label>
                                <Input type="text" name="type_of_activity" id="type_of_activity" value={formData.type_of_activity} onChange={handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="date">Date</Label>
                                <Input type="date" name="date" id="date" value={formData.date} onChange={handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="start_time">Start Time</Label>
                                <Input type="time" name="start_time" id="start_time" value={formData.start_time} onChange={handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="end_time">End Time</Label>
                                <Input type="time" name="end_time" id="end_time" value={formData.end_time} onChange={handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="participants_limit">Participants Limit</Label>
                                <Input type="number" name="participants_limit" id="participants_limit" value={formData.participants_limit} onChange={handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="price">Price</Label>
                                <Input type="text" name="price" id="price" value={formData.price} onChange={handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="images">Image</Label>
                                <Input type="file" name="images" id="images" accept="images/*" onChange={handleImageChange} />
                            </FormGroup>
                            <Button type="submit" color="primary">Submit</Button>
                            <Button color="secondary" onClick={toggleModal}>Close</Button>
                        </Form>
                    </ModalBody>
                </Modal>

                <SimpleFooter />
            </main>
        </>
    );
};

export default Activity;