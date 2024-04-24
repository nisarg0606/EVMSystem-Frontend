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
    Input,
} from 'reactstrap';

const BookingModal = ({ id, onClose, scrollable }) => {
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
        return <div>Error: {error.message || 'Something went wrong.'}</div>;
    }

    if (!bookingData) {
        return <div>No booking data available.</div>;
    }

    const renderBooking = (booking, title) => {
        if (booking.length === 0) {
            return <p>No {title.toLowerCase()} available.</p>;
        }

        return (
            <div>
                <h3 className="tw-text-md tw-font-semibold tw-mb-2">{title}</h3>
                {booking.map((data, index) => (
                    <div key={data._id} className="tw-mb-4">
                        <p><strong>Venue:</strong> {data.venue}</p>
                        <p><strong>User:</strong> {data.user.firstName} {data.user.lastName}</p>
                        <p><strong>Email:</strong> {data.user.email}</p>
                        <p><strong>Booking Date:</strong> {new Date(data.booking_date).toLocaleDateString()}</p>

                        <p><strong>Time Slot:</strong></p>
                        {/* Iterate through each time slot and display the details */}
                        {data.booking_time_slot.map((timeSlot) => (
                            <div key={timeSlot._id}>
                                <p>From: {timeSlot.from}</p>
                                <p>To: {timeSlot.to}</p>
                            </div>
                        ))}

                        {index < booking.length - 1 && <hr />}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <Modal isOpen={true} toggle={onClose} scrollable={scrollable}>
            <ModalHeader toggle={onClose}>Booking Details</ModalHeader>
            <ModalBody>
                {bookingData.past && renderBooking(bookingData.past, 'Past Bookings')}
                {bookingData.upcoming && renderBooking(bookingData.upcoming, 'Upcoming Bookings')}
            </ModalBody>
            <div className="tw-flex tw-justify-end tw-mt-4">
                <Button color="secondary" onClick={onClose}>Close</Button>
            </div>
        </Modal>
    );
};

export default BookingModal;
