import React, { useEffect, useState } from "react";
import { Spinner, Card } from "reactstrap";
import "tailwindcss/tailwind.css";
import HostDashboard from "../../src/utils/HostDashboard";

const HostDashboardView = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHostDashboard = async () => {
      try {
        const data = await HostDashboard();
        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching host dashboard:", error.message);
        setError(
          "An error occurred while fetching data. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHostDashboard();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <p>Loading...</p>
        <Spinner
          color="primary"
          style={{
            height: "3rem",
            width: "3rem",
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
        <p>{error}</p>
      </div>
    );
  }

  const renderVenueBooking = (booking) => {
    return (
      <div
        key={booking._id}
        className="tw-bg-white tw-p-4 tw-mb-4 tw-shadow-lg tw-rounded-lg"
      >
        <h5 className="tw-font-semibold tw-text-lg tw-text-gray-800">
          {booking.venue.name}
        </h5>
        <p className="tw-text-sm tw-text-gray-600">
          User: {booking.user.firstName} {booking.user.lastName}
        </p>
        <p className="tw-text-sm tw-text-gray-600">
          Email: {booking.user.email}
        </p>
        <p className="tw-text-sm tw-text-gray-600">
          Booking Date: {new Date(booking.booking_date).toLocaleDateString()}
        </p>
        <p className="tw-text-sm tw-text-gray-600">
          Time Slot:{" "}
          {booking.booking_time_slot
            .map((slot) => `${slot.from} - ${slot.to}`)
            .join(", ")}
        </p>
      </div>
    );
  };

  const renderActivityBooking = (activity) => {
    return (
      <div
        key={activity.activityName}
        className="tw-bg-white tw-p-4 tw-mb-4 tw-shadow-lg tw-rounded-lg"
      >
        <h5 className="tw-font-semibold tw-text-lg tw-text-gray-800">
          {activity.activityName}
        </h5>
        <p className="tw-text-sm tw-text-gray-600">
          Participants Count: {activity.participantsCount}
        </p>
      </div>
    );
  };

  return (
    <div className="tw-container tw-mx-auto tw-px-4 tw-py-8">
      <Card className="tw-grid  tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4 tw-p-4 tw-bg-blue-200">
        {/* Past Venue Bookings */}
        <div>
          <hr className="tw-my-2 tw-border-gray-300" />

          <h3 className="tw-text-2xl tw-text-black tw-font-semibold tw-mb-4">
            Past Venue Bookings
          </h3>
          <hr className="tw-my-2 tw-border-gray-300" />
          <br></br>

          {dashboardData.venueBookings.past.length === 0 ? (
            <p className="tw-text-lg tw-text-gray-500 tw-font-semibold">
              No past venue bookings found.
            </p>
          ) : (
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              {dashboardData.venueBookings.past.map(renderVenueBooking)}
            </div>
          )}
        </div>

        {/* Upcoming Venue Bookings */}
        <div>
          <hr className="tw-my-2 tw-border-gray-300" />

          <h3 className="tw-text-2xl tw-text-black tw-font-semibold tw-mb-4">
            Upcoming Venue Bookings
          </h3>
          <hr className="tw-my-2 tw-border-gray-300" />
          <br></br>

          {dashboardData.venueBookings.upcoming.length === 0 ? (
            <p className="tw-text-lg tw-text-gray-500 tw-font-semibold">
              No upcoming venue bookings found.
            </p>
          ) : (
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              {dashboardData.venueBookings.upcoming.map(renderVenueBooking)}
            </div>
          )}
        </div>
      </Card>

      <br></br>
      <br></br>

      {/* Activities */}
      <Card className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4 tw-p-4 tw-bg-blue-200 ">
        {/* Past Activities */}
        <div>
          <hr className="tw-my-2 tw-border-gray-300" />

          <h3 className="tw-text-2xl tw-text-black tw-font-semibold ">
            Past Activities
          </h3>
          <hr className="tw-my-2 tw-border-gray-300" />
          <br></br>

          {dashboardData.activityBookings.pastActivities.length === 0 ? (
            <p className="tw-text-lg tw-text-gray-500 tw-font-semibold">
              No past activities found.
            </p>
          ) : (
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              {dashboardData.activityBookings.pastActivities.map(
                renderActivityBooking
              )}
            </div>
          )}
        </div>

        {/* Upcoming Activities */}
        <div>
          <hr className="tw-my-2 tw-border-gray-300" />
          <h3 className="tw-text-2xl tw-text-black tw-font-semibold tw4-mb-">
            Upcoming Activities
          </h3>
          <hr className="tw-my-2 tw-border-gray-300" />
          <br></br>

          {dashboardData.activityBookings.upcomingActivities.length === 0 ? (
            <p className="tw-text-lg tw-text-gray-500 tw-font-semibold">
              No upcoming activities found.
            </p>
          ) : (
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              {dashboardData.activityBookings.upcomingActivities.map(
                renderActivityBooking
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default HostDashboardView;
