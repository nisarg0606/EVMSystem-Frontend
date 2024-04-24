import React, { useState, useEffect } from 'react';
import {
    Card,
    Container,
    Spinner,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import CardMain from 'components/CardMain/CardMain';
import DemoNavbar from 'components/Navbars/DemoNavbar';
import SimpleFooter from 'components/Footers/SimpleFooter';
import GetAllActivities from '../../utils/GetAllActivites.js';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GetMyActivities from '../../utils/MyActivities.js';

const Activity = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [activitiesPerPage] = useState(3);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [venue, setVenue] = useState('');
    const [typeOfActivity, setTypeOfActivity] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [participantsLimit, setParticipantsLimit] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    
    const [modalLoading, setModalLoading] = useState(false);
    
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setModalLoading(true);
        
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('venue', venue);
        formData.append('type_of_activity', typeOfActivity);
        formData.append('date', date);
        formData.append('start_time', startTime);
        formData.append('end_time', endTime);
        formData.append('participants_limit', participantsLimit);
        formData.append('price', price);
        formData.append('image', image);  // File upload
        
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/activities', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            toast.success("Activity Created successfully");
            setModal(false);
        } catch (error) {
            toast.error(`Error: ${error.response ? error.response.data.message : error.message}`);
        } finally {
            setModalLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const activitiesResponse = await GetMyActivities();
                setActivities(activitiesResponse);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const indexOfLastActivity = currentPage * activitiesPerPage;
    const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
    const currentActivities = activities.slice(indexOfFirstActivity, indexOfLastActivity);
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
                                            imageSrc={activity.imageURL}
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
                        <div>
                            {modalLoading ? (
                                <div className="text-center">
                                    <p>Loading...</p>
                                    <Spinner color="primary" style={{ width: '3rem', height: '3rem' }} />
                                </div>
                            ) : (
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                    <Input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="description">Description</Label>
                                    <Input
                                        type="textarea"
                                        id="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="venue">Venue</Label>
                                    <Input
                                        type="text"
                                        id="venue"
                                        value={venue}
                                        onChange={(e) => setVenue(e.target.value)}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="typeOfActivity">Type of Activity</Label>
                                    <Input
                                        type="text"
                                        id="typeOfActivity"
                                        value={typeOfActivity}
                                        onChange={(e) => setTypeOfActivity(e.target.value)}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="date">Date</Label>
                                    <Input
                                        type="date"
                                        id="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="startTime">Start Time</Label>
                                    <Input
                                        type="time"
                                        id="startTime"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="endTime">End Time</Label>
                                    <Input
                                        type="time"
                                        id="endTime"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="participantsLimit">Participants Limit</Label>
                                    <Input
                                        type="number"
                                        id="participantsLimit"
                                        value={participantsLimit}
                                        onChange={(e) => setParticipantsLimit(Number(e.target.value))}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="price">Price</Label>
                                    <Input
                                        type="number"
                                        id="price"
                                        value={price}
                                        onChange={(e) => setPrice(Number(e.target.value))}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="image">Image</Label>
                                    <Input
                                        type="file"
                                        id="image"
                                        onChange={(e) => setImage(e.target.files[0])}
                                        required
                                    />
                                </FormGroup>
                                <Button type="submit" className='tw-text-black' color="primary">Create Activity</Button>
                            </Form>

                            )}
                        </div>
                    </ModalBody>
                </Modal>

                <SimpleFooter />
                <ToastContainer />

            </main>
        </>
    );
};

export default Activity;