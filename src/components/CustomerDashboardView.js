import React, { useEffect, useState } from 'react';
import { Card, Spinner } from 'reactstrap';
import 'tailwindcss/tailwind.css';
import CustomerDashboard from '../../src/utils/CustomerDashboard';

const CustomerDashboardView = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomerDashboard = async () => {
            try {
                const data = await CustomerDashboard();
                setDashboardData(data);
            } catch (error) {
                console.error("Error fetching customer dashboard:", error.message);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomerDashboard();
    }, []);

    if (loading) {
        return (
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
        );
    }

    if (error) {
        return (
            <div className="text-center">
                <h1 className='tw-text-lg '>Oops! Something went wrong.</h1>
            </div>
        );
    }

    const renderVenueBooking = (booking) => {
        return (
            <div key={booking._id} className="tw-bg-white  tw-p-4 tw-mb-4 tw-shadow-lg tw-rounded-lg">
                <h5 className="tw-font-semibold tw-text-lg tw-text-gray-800">{booking.venue.name}</h5>
                <p className="tw-text-sm tw-text-gray-600">Booking Date: {new Date(booking.booking_date).toLocaleDateString()}</p>
                <p className="tw-text-sm tw-text-gray-600">Time Slot: {booking.booking_time_slot.map(slot => `${slot.from} - ${slot.to}`).join(', ')}</p>
            </div>
        );
    };

    const renderActivityBooking = (booking) => {
        return (
            <div key={booking._id} className="tw-bg-white tw-p-4 tw-mb-4 tw-shadow-lg tw-rounded-lg">
                <h5 className="tw-font-semibold tw-text-lg tw-text-gray-800">{booking.activity.name}</h5>
                <p className="tw-text-sm tw-text-gray-600">Booking Date: {new Date(booking.booking_date).toLocaleDateString()}</p>
            </div>
        );
    };

    return (
        <div className="tw-container tw-mx-auto tw-px-4 tw-py-8">
            {/* Past and Upcoming Venue Bookings */}
            <Card className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4 tw-p-4 tw-bg-blue-200 tw-shadow-lg">
                <div>
                    <hr className="tw-my-2 tw-border-white" />
                    <h3 className="tw-text-2xl tw-text-black tw-font-semibold tw-mb-4 tw-text-center">Past Venue Bookings</h3>
                    <hr className="tw-my-2 tw-border-white" />
                    <br />
                    <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                        {dashboardData.venueBookings.pastVenueBookings.length > 0 ?
                            dashboardData.venueBookings.pastVenueBookings.map(renderVenueBooking) :
                            <p>No past venue bookings</p>
                        }
                    </div>
                </div>
                <div>
                    <hr className="tw-my-2 tw-border-white" />
                    <h3 className="tw-text-2xl tw-text-black tw-font-semibold tw-mb-4 tw-text-center">Upcoming Venue Bookings</h3>
                    <hr className="tw-my-2 tw-border-white" />
                    <br />
                    <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                        {dashboardData.venueBookings.upcomingVenueBookings.length > 0 ?
                            dashboardData.venueBookings.upcomingVenueBookings.map(renderVenueBooking) :
                            <p>No upcoming venue bookings</p>
                        }
                    </div>
                </div>
            </Card>

            <br></br>
            <br></br>


            {/* Past and Upcoming Activity Bookings */}
            <Card className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4 tw-p-4 tw-bg-blue-200 tw-shadow-lg">
                <div>
                    <hr className="tw-my-2 tw-border-white" />
                    <h3 className="tw-text-2xl tw-text-black tw-font-semibold tw-mb-4 tw-text-center">Past Activities</h3>
                    <hr className="tw-my-2 tw-border-white" />
                    <br />
                    <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                        {dashboardData.activityBookings && dashboardData.activityBookings.pastActivities && dashboardData.activityBookings.pastActivities.length === 0 ? (
                            <p className="tw-text-lg tw-text-gray-500 tw-font-semibold">No past activities found.</p>
                        ) : (
                            dashboardData.activityBookings.pastActivities.map(renderActivityBooking)
                        )}
                    </div>
                </div>
                <div>
                    <hr className="tw-my-2 tw-border-white" />
                    <h3 className="tw-text-2xl tw-text-black tw-font-semibold tw-mb-4 tw-text-center">Upcoming Activities</h3>
                    <hr className="tw-my-2 tw-border-white" />
                    <br />
                    <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                        {dashboardData.activityBookings && dashboardData.activityBookings.upcomingActivities && dashboardData.activityBookings.upcomingActivities.length === 0 ? (
                            <p className="tw-text-lg tw-text-gray-500 tw-font-semibold">No upcoming activities found.</p>
                        ) : (
                            dashboardData.activityBookings.upcomingActivities.map(renderActivityBooking)
                        )}
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default CustomerDashboardView;
