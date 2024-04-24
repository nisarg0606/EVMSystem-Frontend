import React, { useEffect, useState } from 'react';
import {
    Card, Container, ListGroup, ListGroupItem, Pagination, PaginationItem, PaginationLink, Row, Col, Spinner, Input, InputGroup, InputGroupAddon, InputGroupText
} from 'reactstrap';
import DemoNavbar from 'components/Navbars/DemoNavbar';
import SimpleFooter from 'components/Footers/SimpleFooter';
import Peoples from '../../utils/Peoples';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const People = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(7);
    const [loading, setLoading] = useState(true); // State variable for loading
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setLoading(true); // Start loading
        Peoples()
            .then(data => {
                setUsers(data.users);
                setLoading(false); // Stop loading
            })
            .catch(error => {
                console.error("Error fetching users:", error);
                setLoading(false); // Stop loading in case of error
            });
    }, []);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(users.length / usersPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset pagination when searching
    };

    const filteredUsers = users.filter(user => {
        const usernameMatch = user.username.toLowerCase().includes(searchTerm.toLowerCase());
        const interestsMatch = user.interestedIn.some(interest => interest.toLowerCase().includes(searchTerm.toLowerCase()));
        return usernameMatch || interestsMatch;
    });

    const renderUsers = filteredUsers.length > 0 ? filteredUsers : currentUsers;

    return (
        <>
            <DemoNavbar />
            <main className="profile-page">
                <section className="section-profile-cover section-shaped my-0">
                    <div className="shape shape-style-1 shape-default alpha-4">
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                    </div>
                    <Container className="shape-container d-flex align-items-center py-lg">
                        <div className="col px-0">
                            <Row className="align-items-center justify-content-center">
                                <Col className="tw-mx-auto tw-text-center" lg="10">
                                    <h1 className="tw-text-xl lg:tw-text-2xl tw-font-serif tw-font-bold tw-text-center tw-text-gray-800 tw-my-4">
                                        People With Similar Interests
                                    </h1>
                                </Col>
                            </Row>
                        </div>
                    </Container>
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
                    <Container>
                        <Card className="card-profile shadow mt--300 rounded">
                            <div className="tw-p-4 tw-bg-gray-100">
                                <h1 className="tw-text-2xl tw-mb-4 tw-font-bold">User List</h1>
                                <InputGroup className="tw-mb-4">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Search</InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" placeholder="Search by username or interest..." value={searchTerm} onChange={handleSearch} />
                                </InputGroup>
                                {loading ? (
                                    // Display the spinner while loading
                                    <div className="tw-flex tw-justify-center tw-my-4">
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
                                ) : renderUsers.length === 0 ? (
                                    // Display a message if the user list is empty
                                    <p>No users to display</p>
                                ) : (
                                    // Display the list of current page users
                                    <ListGroup>
                                        {renderUsers.map(user => (
                                            <ListGroupItem key={user.id} className="tw-mb-2">
                                                <div className="tw-flex tw-flex-col tw-bg-white tw-p-4 tw-shadow-md">
                                                    <p className="tw-font-semibold">Username: {user.username}</p>
                                                    <p>Email: {user.email}</p>
                                                    <p>Interests: {user.interestedIn.join(', ')}</p>
                                                </div>
                                            </ListGroupItem>
                                        ))}
                                    </ListGroup>
                                )}
                                {/* Pagination */}
                                <Pagination className="tw-mt-4">
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <PaginationItem key={index} active={index + 1 === currentPage}>
                                            <PaginationLink onClick={() => handlePageChange(index + 1)}>
                                                {index + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                </Pagination>
                            </div>
                        </Card>
                    </Container>
                </section>
            </main>
            <SimpleFooter />
            <ToastContainer />
        </>
    );
};

export default People;
