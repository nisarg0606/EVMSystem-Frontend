import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';

const BASE_URL = "http://localhost:5000/";
const token = localStorage.getItem("token");

const HostDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentVenuePage, setCurrentVenuePage] = useState(1);
    const [venueBookingsPerPage] = useState(5); // Number of venue bookings per page
    const [currentActivityPage, setCurrentActivityPage] = useState(1);
    const [activitiesPerPage] = useState(5); // Number of activities per page

    useEffect(() => {
        const fetchHostDashboard = async () => {
            try {
                const response = await fetch(`${BASE_URL}users/host/dashboard`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch host dashboard: ${response.status}`);
                }

                const data = await response.json();
                setDashboardData(data);
            } catch (error) {
                console.error("Error fetching host dashboard:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHostDashboard();
    }, []);

    if (loading) {
        return <div className="tw-text-center tw-text-xl">Loading...</div>;
    }

    // Pagination logic for venue bookings
    const venueIndexOfLastBooking = currentVenuePage * venueBookingsPerPage;
    const venueIndexOfFirstBooking = venueIndexOfLastBooking - venueBookingsPerPage;
    const currentPastVenueBookings = dashboardData.venueBookings.past.slice(
        venueIndexOfFirstBooking,
        venueIndexOfLastBooking
    );
    const currentUpcomingVenueBookings = dashboardData.venueBookings.upcoming.slice(
        venueIndexOfFirstBooking,
        venueIndexOfLastBooking
    );

    // Pagination logic for activities
    const activityIndexOfLastActivity = currentActivityPage * activitiesPerPage;
    const activityIndexOfFirstActivity = activityIndexOfLastActivity - activitiesPerPage;
    const currentUpcomingActivities = dashboardData.activityBookings.upcomingActivities.slice(
        activityIndexOfFirstActivity,
        activityIndexOfLastActivity
    );

    const renderVenueBooking = (booking) => {
        return (
            <div key={booking._id} className="tw-bg-white tw-p-4 tw-mb-4 tw-shadow-lg tw-rounded-lg">
                <h5 className="tw-font-semibold">{booking.venue.name}</h5>
                <p>User: {booking.user.firstName} {booking.user.lastName}</p>
                <p>Email: {booking.user.email}</p>
                <p>Booking Date: {new Date(booking.booking_date).toLocaleDateString()}</p>
                <p>Time Slot: {booking.booking_time_slot.map(slot => `${slot.from} - ${slot.to}`).join(', ')}</p>
            </div>
        );
    };

    const renderActivityBooking = (activity) => {
        return (
            <div key={activity.activityName} className="tw-bg-white tw-p-4 tw-mb-4 tw-shadow-lg tw-rounded-lg">
                <h5 className="tw-font-semibold">{activity.activityName}</h5>
                <p>Participants Count: {activity.participantsCount}</p>
            </div>
        );
    };

    const renderPaginationControls = (currentPage, itemsPerPage, totalItems, paginate) => {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
        return (
            <div className="tw-flex tw-justify-center tw-gap-2 tw-mt-4">
                {pages.map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => paginate(pageNumber)}
                        className={`tw-px-3 tw-py-2 tw-rounded-md ${currentPage === pageNumber ? 'tw-bg-gray-300' : 'tw-bg-white'}`}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div className="tw-container tw-mx-auto tw-px-4 tw-py-8">
            <div className="tw-grid tw-grid-cols-1 tw-md:grid-cols-2 tw-gap-4">
                {/* Past Venue Bookings */}
                <div>
                    <h3 className="tw-text-2xl tw-font-semibold tw-mb-4">Past Venue Bookings</h3>
                    {currentPastVenueBookings.map(renderVenueBooking)}
                    {/* Pagination controls */}
                    {renderPaginationControls(currentVenuePage, venueBookingsPerPage, dashboardData.venueBookings.past.length, setCurrentVenuePage)}
                </div>

                {/* Upcoming Venue Bookings */}
                <div>
                    <h3 className="tw-text-2xl tw-font-semibold tw-mb-4">Upcoming Venue Bookings</h3>
                    {currentUpcomingVenueBookings.map(renderVenueBooking)}
                    {/* Pagination controls */}
                    {renderPaginationControls(currentVenuePage, venueBookingsPerPage, dashboardData.venueBookings.upcoming.length, setCurrentVenuePage)}
                </div>
            </div>

            {/* Upcoming Activities */}
            <div>
                <h3 className="tw-text-2xl tw-font-semibold tw-mb-4">Upcoming Activities</h3>
                {currentUpcomingActivities.map(renderActivityBooking)}
                {/* Pagination controls */}
                {renderPaginationControls(currentActivityPage, activitiesPerPage, dashboardData.activityBookings.upcomingActivities.length, setCurrentActivityPage)}
            </div>
        </div>
    );
};

export default HostDashboard;
