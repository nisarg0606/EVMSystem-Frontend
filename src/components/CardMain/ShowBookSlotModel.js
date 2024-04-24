import React, { useState, useEffect } from 'react';
import ShowBooking from '../../utils/ShowBooking';
import AvailabelSlot from '../../utils/AvailabelBookSlot';
import BookSlot from '../../utils/BookSlot';
import 'react-datepicker/dist/react-datepicker.css';

import {
    Spinner,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Modal,
    ModalBody,
    ModalFooter
} from 'reactstrap';

const BookSlotModel = ({ id, onClose }) => {
    const [bookingData, setBookingData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [noSlotsMessage, setNoSlotsMessage] = useState(null);
    const [showFakePaymentModal, setShowFakePaymentModal] = useState(false);
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });
    const [showCardDetailsForm, setShowCardDetailsForm] = useState(false);
    const [price, setPrice] = useState(0); // State for holding the price

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

    useEffect(() => {
        // Calculate price based on selected slots
        const calculatePrice = () => {
            const basePrice = 10; // Base price for one slot
            const additionalPricePerSlot = 5; // Additional price per slot

            const totalPrice = basePrice + additionalPricePerSlot * selectedSlots.length;
            setPrice(totalPrice);
        };

        calculatePrice();
    }, [selectedSlots]);

    const handleDateChange = (event) => {
        const selectedDate = new Date(event.target.value);
        setSelectedDate(selectedDate);
    };

    const handleSubmit = async () => {
        try {
            const date = selectedDate ? selectedDate.toISOString().split('T')[0] : null;
            if (date) {
                const bookedSlotData = await AvailabelSlot(id, date);

                if (bookedSlotData && bookedSlotData.availableSlots) {
                    setAvailableSlots(bookedSlotData.availableSlots);
                    setNoSlotsMessage(null);
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
                return prevSelectedSlots.filter((date) => date !== slotDate);
            } else {
                return [...prevSelectedSlots, slotDate];
            }
        });
    };

    const handleBookSlot = async () => {
        setShowFakePaymentModal(true);
    };

    const handleCardDetailsChange = (event) => {
        const { name, value } = event.target;
        setCardDetails({ ...cardDetails, [name]: value });
    };

    const handleConfirmFakePayment = async () => {
        try {
            setLoading(true);
            const selectedDateString = selectedDate ? selectedDate.toISOString().split('T')[0] : null;
            if (selectedDateString && selectedSlots.length > 0) {
                const response = await BookSlot(selectedDateString, selectedSlots, id);
                alert('Booking successful:', response);
                onClose();
            } else {
                console.log('Please select a date and at least one slot before booking.');
            }
        } catch (error) {
            console.log('Error booking slots:', error.message);
        } finally {
            setLoading(false);
        }

        try {
            setLoading(true);
            if (validateCardDetails(cardDetails)) {
                console.log(' payment successful');
                onClose();
            } else {
                console.log('Please enter valid card details.');
            }
        } catch (error) {
            console.log('Error booking slots:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const validateCardDetails = (cardDetails) => {
        return cardDetails.cardNumber !== '' && cardDetails.expiryDate !== '' && cardDetails.cvv !== '';
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
                <div className="tw-flex tw-justify-between tw-items-center"> {/* Flex container for heading and close icon */}
                    <h2 className="tw-text-lg tw-font-semibold tw-mb-4">Booking Details</h2>
                    <div onClick={onClose} className="tw-cursor-pointer"> {/* Close icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="tw-h-6 tw-w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>
                </div>
                <Form>
                    <FormGroup>
                        <Label for="datePicker">Select Date:</Label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            className="tw-py-2 tw-px-4 tw-border tw-rounded-md tw-w-full"
                        />

                    </FormGroup>
                    {selectedDate && (
                        <h1>Selected Date: {new Date(selectedDate).toLocaleDateString()}</h1>
                    )}
                    <div className="tw-flex tw-justify-between tw-mt-4">
                        <Button
                            color="primary"
                            onClick={handleSubmit}
                            className="tw-py-2 tw-px-4 tw-rounded-md tw-text-black"
                        >
                            Submit
                        </Button>

                    </div>
                </Form>

                {availableSlots.length > 0 && (
                    <div className="mt-4">
                        <h3 className="text-lg font-bold mb-2">Available Slots:</h3>
                        <ul>
                            {availableSlots.map((slot) => (
                                <li key={slot._id} className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        id={`slot-${slot._id}`}
                                        checked={selectedSlots.includes(`${slot.from} - ${slot.to}`)}
                                        onChange={() => handleCheckboxChange(slot.from, slot.to)}
                                        className="form-checkbox h-4 w-4 text-green-600 mr-2"
                                    />
                                    <label htmlFor={`slot-${slot._id}`} className="text-sm text-gray-700">
                                        From {slot.from} to {slot.to}
                                    </label>
                                </li>
                            ))}
                        </ul>
                        <p className="text-lg mt-4">Total Price: ${price}</p>
                        <button
                            onClick={handleBookSlot}
                            className="tw-py-2 tw-px-4 tw-rounded-md tw-bg-green-600 tw-text-white tw-mt-4 tw-inline-block tw-transition tw-duration-300 tw-ease-in-out tw-hover:bg-green-700"
                        >
                            Pay
                        </button>
                    </div>
                )}


                {noSlotsMessage && (
                    <div className="tw-mt-4">
                        <h3>{noSlotsMessage}</h3>
                    </div>
                )}

                {/* Fake payment modal */}
                <Modal isOpen={showFakePaymentModal} toggle={() => setShowFakePaymentModal(false)}>
                    <ModalBody>
                        <h1> Payment </h1>
                        {/* Display total price */}
                        {showCardDetailsForm && (
                            <Form>
                                <FormGroup>
                                    <Label for="cardNumber">Card Number:</Label>
                                    <Input
                                        type="text"
                                        name="cardNumber"
                                        value={cardDetails.cardNumber}
                                        onChange={handleCardDetailsChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="expiryDate">Expiry Date:</Label>
                                    <Input
                                        type="text"
                                        name="expiryDate"
                                        value={cardDetails.expiryDate}
                                        onChange={handleCardDetailsChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="cvv">CVV:</Label>
                                    <Input
                                        type="text"
                                        name="cvv"
                                        value={cardDetails.cvv}
                                        onChange={handleCardDetailsChange}
                                    />
                                </FormGroup>
                            </Form>

                        )}
                    </ModalBody>
                    <h1>Total Price: ${price}</h1>
                    <ModalFooter>
                        {!showCardDetailsForm && (
                            <Button color="primary" className='tw-text-black' onClick={() => setShowCardDetailsForm(true)}>Enter Card Details</Button>
                        )}
                        {showCardDetailsForm && (
                            <Button color="primary" className='tw-text-black' onClick={handleConfirmFakePayment}>Confirm Payment</Button>
                        )}
                    </ModalFooter>
                </Modal>

            </div>
        </div>
    );
};

export default BookSlotModel;