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
    Input,
    DropdownToggle,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Row,
    Col
} from 'reactstrap';
import CardMain from 'components/CardMain/CardMain';
import DemoNavbar from 'components/Navbars/DemoNavbar';
import SimpleFooter from 'components/Footers/SimpleFooter';
import GetAllActivities from '../../utils/GetAllActivites.js';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GetMyActivities from '../../utils/MyActivities.js';
import GetUpCommingActivites from '../../utils/getUpCommingActivities.js';
import { CSVLink } from 'react-csv'; 
import Papa from 'papaparse'; 
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
    const [getUpCommingActivities, setUpCommingActivites] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownItems, setDropdownItems] = useState([]);
    const [venueName, setVenueName] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const [modalLoading, setModalLoading] = useState(false);
    const userRole = localStorage.getItem("role");

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
            window.location.reload()
            setModal(false);
        } catch (error) {
            toast.error(`Error: ${error.response ? error.response.data.message : error.message}`);
        } finally {
            setModalLoading(false);
        }
    };
    const handleClick = () => {
        window.location.href = 'venue';
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

    const handleSearchButtonClick = async () => {
        if (searchQuery.trim() !== '') {
            try {
                const results = await GetMyActivities(searchQuery);
                setSearchResults(results);
            } catch (error) {
                console.error("Error searching activities:", error.message);
            }
        }
    };

    const handleClearSearch = async () => {

        setSearchQuery('');
        setSearchResults([]);
        setCurrentPage(1);
    };

    const handleGetUpcommingActivity = async () => {
        try {
            const activitiesResponse = await GetUpCommingActivites();
            setUpCommingActivites(activitiesResponse.upcoming[0].venue_name);
            console.log(activitiesResponse.upcoming[0].venue_name)
            const venueNames = activitiesResponse.upcoming.map(activity => activity.venue_name);
            const items = activitiesResponse.upcoming.map(activity => ({
                venue: activity.venue,
                venue_name: activity.venue_name,
                booking_date: activity.booking_date,
            }));
            console.log(items)
            setDropdownItems(items);

        } catch (error) {
            console.error(error);
        } finally {
        }
    };
    const handleItemClick = (venue, venueName, date) => {
        setVenue(venue);
        setVenueName(venueName);
        setDate(date);
    };


    //csv evmsystem
    const handleDownloadCSV = () => {
        const csvData = activities.map(activity => ({
            Name: activity.name,
            Description: activity.description,
            Venue: activity.venue ? (typeof activity.venue === 'object' ? activity.venue.name : activity.venue) : '',
            type_Of_Activity:activity.type_of_activity,
            Date: activity.date,
            Start_time : activity.start_time,
            Start_time : activity.end_time,

        }));
    
        const headers = [
            { label: 'Name', key: 'Name' },
            { label: 'Description', key: 'Description' },
            { label: 'Venue', key: 'Venue' },
            { label: 'Type Of Activity ', key: 'typeOfActivity' },
            { label: 'Date', key: 'Date' },
            { label: 'Start time', key: 'Start_time' },
            { label: 'End Timeate', key: 'Start_time' },
        ];
    
        console.log(csvData);
    
        const csvLink = document.createElement('a');
        csvLink.href = URL.createObjectURL(new Blob([Papa.unparse(csvData)], { type: 'text/csv' }));
        csvLink.setAttribute('download', 'activities.csv');
        document.body.appendChild(csvLink);
        csvLink.click();
        document.body.removeChild(csvLink);
    };
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
                    <iframe src='https://my.spline.design/3dtextbluecopy-395969798f2e0f678112143bc75ac6e0/' frameborder='0' width='100%' height='100%'></iframe>

                    <div className="shape shape-style-1 shape-default alpha-4">
                        <span />
                        <span />
                        <span />
                        <span />

                    </div>
                    <Container className="shape-container d-flex align-items-center py-lg ">

                        <div className="col px-0">
                            <Row className="align-items-center justify-content-center">
                                <Col className="tw-mx-auto tw-text-center" lg="10">
                                    <h1 className="tw-text-xl lg:tw-text-2xl tw-font-serif tw-font-bold tw-text-center tw-text-gray-800 tw-my-4">Activity</h1>
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
                        <Container>
                            <Card className="card-profile shadow mt--300 rounded">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-blue p-4">
                                    <div className="tw-flex tw-justify-between -tw-items-center">
                                        {userRole !== 'customer' && (

                                            <Button onClick={() => { toggleModal(); handleGetUpcommingActivity(); }} className="mr-2 tw-text-black">
                                                Create Activity
                                            </Button>

                                        )}

                                        <div className="tw-flex items-center ">
                                            <Input
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                placeholder="Search by name or description"
                                                className="tw-mr-2 tw-w-64"
                                            />
                                            <Button onClick={handleSearchButtonClick} className="mr-2 tw-text-white">
                                                Search
                                            </Button>
                                            {searchQuery && (
                                                <Button onClick={handleClearSearch} className="mr-2 tw-text-white">
                                                    Clear
                                                </Button>
                                            )}

                                            <div>
                                                {/* Button to trigger CSV download */}
                                                {activities.length > 0 && (
                                                    <Button onClick={handleDownloadCSV} className="mr-2 tw-text-black">Download CSV</Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <br>
                                    </br>
                                    {searchResults.length > 0 ? (
                                        searchResults.map(activity => (
                                            <CardMain
                                                key={activity._id}
                                                // Assuming other props for activity card
                                                imageSrc={activity.imageURL}
                                                title={activity.name}
                                                description={activity.description}
                                                venue={activity.venue}
                                                activityType={activity.type_of_activity}
                                                date={activity.date}
                                                start_time={activity.start_time}
                                                end_time={activity.end_time}
                                                participantsLimit={activity.participants_limit}
                                                price={activity.price}
                                                cardType={'activity'}
                                                id={activity._id}
                                            />
                                        ))
                                    ) : (
                                        currentActivities.map(activity => (
                                            <CardMain
                                                key={activity._id}
                                                // Assuming other props for activity card
                                                imageSrc={activity.imageURL}
                                                title={activity.name}
                                                description={activity.description}
                                                venue={activity.venue}
                                                activityType={activity.type_of_activity}
                                                date={activity.date}
                                                start_time={activity.start_time}
                                                end_time={activity.end_time}
                                                participantsLimit={activity.participants_limit}
                                                price={activity.price}
                                                cardType={'activity'}
                                                id={activity._id}
                                            />
                                        ))
                                    )}
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
                                    {/* <Button onClick={() => handleGetUpcommingActivity()}>Get upcoming venues</Button> */}
                                    <Button onClick={handleClick}>Book venues</Button>
                                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                                        <DropdownToggle caret>

                                            Select Venue
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {dropdownItems.map((item, index) => (
                                                <DropdownItem key={index} onClick={() => handleItemClick(item.venue, item.venue_name, item.booking_date)}>
                                                    {"Name : " + item.venue_name + " , Date : " + item.booking_date}
                                                </DropdownItem>
                                            ))}
                                        </DropdownMenu>
                                    </Dropdown>
                                    <FormGroup>
                                        <Label for="venue">Venue</Label>
                                        <Input
                                            type="text"
                                            id="venue"
                                            value={venue}
                                            disabled={true}
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
                                            required
                                            readOnly
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