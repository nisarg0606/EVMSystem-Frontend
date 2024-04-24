import React, { useState, useEffect } from 'react';
import ShowBooking from '../../utils/ShowBooking';
import 'react-toastify/dist/ReactToastify.css';
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

const BookingModal = ({ id, onClose }) => {
    const [bookingData, setBookingData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookingData = async () => {
            try {
                const data = await ShowBooking(id);
                setBookingData(data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchBookingData();
    }, [id]);

    if (loading) {
        return<div className="text-center">
        <p>Loading...</p>
        <Spinner color="primary" style={{ width: '3rem', height: '3rem' }} />
    </div>
    }

    if (error) {
        return <div>Error: {error.message || 'Something went wrong.'}</div>;
    }

    if (!bookingData) {
        return <div>No booking data available.</div>;
    }

    const renderBooking = (booking, title) => (
        <div>
            <h3 className="tw-text-md tw-font-semibold tw-mb-2">{title}</h3>
            
            {booking.map((data, index) => (
                <div key={data._id} className="tw-mb-4">
                    <p><strong>Venue:</strong> {data.venue}</p>
                    <p><strong>User:</strong> {data.user.firstName} {data.user.lastName}</p>
                    <p><strong>Email:</strong> {data.user.email}</p>
                    <p><strong>Booking Date:</strong> {new Date(data.booking_date).toLocaleDateString()}</p>
                    <p><strong>Time Slot:</strong> {data.booking_time_slot}</p>
                    {index < booking.length - 1 && <hr />}
                </div>
            ))}
        </div>
    );

    return (
        <div className="tw-fixed tw-inset-0 tw-flex tw-items-center tw-justify-center tw-bg-gray-500 tw-bg-opacity-75 tw-z-50">
            <div className="tw-bg-white tw-p-6 tw-rounded-lg tw-shadow-lg tw-max-w-lg tw-w-full">
                <h2 className="tw-text-lg tw-font-semibold tw-mb-4">Booking Details</h2>
                {bookingData.past && renderBooking(bookingData.past, 'Past Bookings')}
                {bookingData.upcoming && renderBooking(bookingData.upcoming, 'Upcoming Bookings')}
                <div className="tw-flex tw-justify-end tw-mt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="tw-py-2 tw-px-4 tw-bg-gray-200 tw-text-gray-700 tw-rounded-md tw-hover:bg-gray-300 tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-gray-500"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
