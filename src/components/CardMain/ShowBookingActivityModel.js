import React, { useState } from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';
import BookActivity from '../../utils/BookActivity'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookActivityModel = ({ id, onClose }) => {
    const [bookingQuantity, setBookingQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [csc, setCSC] = useState('');

    const handleBookingQuantityChange = (e) => {
        const quantity = parseInt(e.target.value);
        setBookingQuantity(quantity);
        const calculatedPrice = quantity * 10; 
        setPrice(calculatedPrice);
    };

    const handleCardNumberChange = (e) => {
        setCardNumber(e.target.value);
    };

    const handleExpiryChange = (e) => {
        setExpiry(e.target.value);
    };

    const handleCSCChange = (e) => {
        setCSC(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            console.log('Processing payment...');
            const response = await BookActivity(bookingQuantity, id);
            toast.success('Payment successful!')
            console.log('Booking successful:', response);
            console.log('Payment successful!');
            onClose();
        } catch (error) {
            console.log('Error booking slot:', error.message);
            // Handle payment failure
            console.log('Payment failed!');
        }
        finally{
            toast.success('Payment successful!')
        }
    };

    return (
        <div className="tw-fixed tw-inset-0 tw-flex tw-items-center tw-justify-center tw-bg-gray-500 tw-bg-opacity-75 tw-z-50">
            <div className="tw-bg-white tw-p-6 tw-rounded-lg tw-shadow-lg tw-max-w-lg tw-w-full">
                <h2 className="tw-text-lg tw-font-semibold tw-mb-4">Booking Quantity</h2>
                <div className="tw-mb-4">
                    <p className="tw-font-semibold">Price: ${price}</p>
                </div>

                <Form>
                    <FormGroup>
                        <Label for="bookingQuantity">Booking Quantity:</Label>
                        <Input
                            type="number"
                            id="bookingQuantity"
                            value={bookingQuantity}
                            onChange={handleBookingQuantityChange}
                            className="tw-py-2 tw-px-4 tw-border tw-rounded-md tw-w-full"
                            min="0"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="cardNumber">Card Number:</Label>
                        <Input
                            type="text"
                            id="cardNumber"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            className="tw-py-2 tw-px-4 tw-border tw-rounded-md tw-w-full"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="expiry">Expiry Date:</Label>
                        <Input
                            type="text"
                            id="expiry"
                            value={expiry}
                            onChange={handleExpiryChange}
                            className="tw-py-2 tw-px-4 tw-border tw-rounded-md tw-w-full"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="csc">Csv:</Label>
                        <Input
                            type="text"
                            id="csc"
                            value={csc}
                            onChange={handleCSCChange}
                            className="tw-py-2 tw-px-4 tw-border tw-rounded-md tw-w-full"
                        />
                    </FormGroup>
                    <div className="tw-flex tw-justify-between tw-mt-4">
                        <Button
                            color="primary"
                            onClick={handleSubmit}
                            className="tw-py-2 tw-px-4 tw-rounded-md tw-text-black"
                        >
                            Pay & Book
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
            </div>
            <ToastContainer/>
        </div>
    );
};

export default BookActivityModel;
