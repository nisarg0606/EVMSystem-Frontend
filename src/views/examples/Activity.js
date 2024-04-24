import React, { useEffect, useState } from 'react';
import { Card, Container, Spinner, Button } from 'reactstrap';
import CardMain from 'components/CardMain/CardMain';
import DemoNavbar from 'components/Navbars/DemoNavbar';
import SimpleFooter from 'components/Footers/SimpleFooter';
import GetAllActivities from '../../utils/GetAllActivites.js';

const Activity = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [activitiesPerPage] = useState(3);

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
                                    <button
                                        className="tw-ml-2 tw-inline-flex tw-items-center tw-px-3 tw-py-1 tw-text-sm tw-font-medium tw-text-center tw-text-white tw-bg-green-600 tw-rounded-lg tw-hover:bg-green-700 tw-focus:ring-4 tw-focus:outline-none tw-focus:ring-green-300 dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-green-800"
                                       
                                    >
                                        Create Venue
                                    </button>

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
            </main>
            <SimpleFooter />
        </>
    );
};

export default Activity;
