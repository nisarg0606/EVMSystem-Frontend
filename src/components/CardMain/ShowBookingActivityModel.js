import React, { useState } from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';
import BookActivity from '../../utils/BookActivity'; 

const BookActivityModel = ({ id, onClose }) => {
    const [bookingQuantity, setBookingQuantity] = useState(0);

    const handleBookingQuantityChange = (e) => {
        setBookingQuantity(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await BookActivity(bookingQuantity, id);
            console.log('Booking successful:', response);

            onClose();
        } catch (error) {
            console.log('Error booking slot:', error.message);
        }
    };

    return (
        <div className="tw-fixed tw-inset-0 tw-flex tw-items-center tw-justify-center tw-bg-gray-500 tw-bg-opacity-75 tw-z-50">
            <div className="tw-bg-white tw-p-6 tw-rounded-lg tw-shadow-lg tw-max-w-lg tw-w-full">
                <h2 className="tw-text-lg tw-font-semibold tw-mb-4">Booking Quantity</h2>

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
            </div>
        </div>
    );
};

export default BookActivityModel;
