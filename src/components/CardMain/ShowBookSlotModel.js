import React, { useState, useEffect } from 'react';
import ShowBooking from '../../utils/ShowBooking';
import AvailabelSlot from '../../utils/AvailabelBookSlot';
import BookSlot from '../../utils/BookSlot'; // Import the BookSlot function
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';

import {
    Spinner,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';

const BookSlotModel = ({ id, onClose }) => {
    const [bookingData, setBookingData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [availableSlots, setAvailableSlots] = useState([]); // State for available slots
    const [selectedSlots, setSelectedSlots] = useState([]); // State for selected slots
    const [noSlotsMessage, setNoSlotsMessage] = useState(null);

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

    // Watch for changes in selectedSlots and print the array in console
    useEffect(() => {
        console.log('Selected Dates:', selectedSlots);
    }, [selectedSlots]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleSubmit = async () => {
        try {
            const date = selectedDate ? selectedDate.toISOString().split('T')[0] : null;
            if (date) {
                console.log(date);
                const bookedSlotData = await AvailabelSlot(id, date);

                // Handle the response data
                if (bookedSlotData && bookedSlotData.availableSlots) {
                    setAvailableSlots(bookedSlotData.availableSlots);
                    setNoSlotsMessage(null); // Clear the no slots message
                } else {
                    setAvailableSlots([]);
                    setNoSlotsMessage('No slots available');
                }
            } else {
                console.log('Please select a date before submitting.');
            }
        } catch (error) {
            console.log('Error booking slot:', error.message);
        }
    };

    const handleCheckboxChange = (from, to) => {
        const slotDate = `${from} - ${to}`;

        setSelectedSlots((prevSelectedSlots) => {
            if (prevSelectedSlots.includes(slotDate)) {
                // If the date is already selected, remove it from the array
                return prevSelectedSlots.filter((date) => date !== slotDate);
            } else {
                // Otherwise, add it to the array
                return [...prevSelectedSlots, slotDate];
            }
        });
    };

    const handleBookSlot = async () => {
        try {
            // Get the selected date in the format YYYY-MM-DD
            const selectedDateString = selectedDate ? selectedDate.toISOString().split('T')[0] : null;

            // Make sure the selected date and slots are not empty
            if (selectedDateString && selectedSlots.length > 0) {
                // Call BookSlot function with selected date, selected slots, and ID
                const response = await BookSlot(selectedDateString, selectedSlots, id);
                console.log('ID:', id);
                console.log('Booking successful:', response);
                onClose(); // Close the modal after booking
            } else {
                console.log('Please select a date and at least one slot before booking.');
            }
        } catch (error) {
            console.log('Error booking slots:', error.message);
        }
    };

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

    return (
        <div className="tw-fixed tw-inset-0 tw-flex tw-items-center tw-justify-center tw-bg-gray-500 tw-bg-opacity-75 tw-z-50">
            <div className="tw-bg-white tw-p-6 tw-rounded-lg tw-shadow-lg tw-max-w-lg tw-w-full">
                <h2 className="tw-text-lg tw-font-semibold tw-mb-4">Booking Details</h2>

                <Form>
                    <FormGroup>
                        <Label for="datePicker">Select Date:</Label>
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            className="tw-py-2 tw-px-4 tw-border tw-rounded-md tw-w-full"
                            placeholderText="Choose a date"
                        />
                    </FormGroup>
                    <div className="tw-flex tw-justify-between tw-mt-4">
                        <Button
                            color="primary"
                            onClick={handleSubmit}
                            className="tw-py-2 tw-px-4 tw-rounded-md tw-text-black"
                        >
                            Submit
                        </Button>
                        <Button
                            color="secondary"
                            onClick={onClose}
                            className="tw-py-2 tw-px-4 tw-rounded-md"
                        >
                            Close
                        </Button>
                    </div>
                </Form>

                {/* Display available slots with checkboxes */}
                {availableSlots.length > 0 && (
                    <div className="tw-mt-4">
                        <h3>Available Slots:</h3>
                        <ul>
                            {availableSlots.map((slot) => (
                                <li key={slot._id}>
                                    <Input
                                        type="checkbox"
                                        id={`slot-${slot._id}`}
                                        checked={selectedSlots.includes(`${slot.from} - ${slot.to}`)}
                                        onChange={() => handleCheckboxChange(slot.from, slot.to)}
                                    />
                                    <Label for={`slot-${slot._id}`}>
                                        From {slot.from} to {slot.to}
                                    </Label>
                                </li>
                            ))}
                        </ul>
                        <Button
                            color="secondary"
                            onClick={handleBookSlot}
                            className="tw-py-2 tw-px-4 tw-rounded-md"
                        >
                            Book the slot
                        </Button>
                    </div>
                )}

                {noSlotsMessage && (
                    <div className="tw-mt-4">
                        <h3>{noSlotsMessage}</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookSlotModel;
