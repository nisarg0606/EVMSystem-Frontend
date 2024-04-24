import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Button, CustomInput } from 'reactstrap';
import PropTypes from 'prop-types';

const CreateVenueModal = ({ isOpen, toggle, handleSubmit }) => {
  const [venueData, setVenueData] = useState({
    name: '',
    capacity: '',
    location: '',
    type: '',
    price: '',
    description: '',
    images: [],
    date: '',
    time: '',
    timings: [
      {
        day: 'monday',
        times: [
          {
            from: '',
            to: ''
          }
        ]
      }
    ]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenueData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setVenueData(prevState => ({
      ...prevState,
      [name]: files[0]
    }));
  };

  const handleDayChange = (e) => { 
    const { value } = e.target;
    setVenueData(prevState => ({
      ...prevState,
      day: value
    }));
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setVenueData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  return (
    <Modal isOpen={isOpen} toggle={toggle} className="tw-max-w-4xl tw-m-auto tw-p-6"> {/* Adjusted width to tw-max-w-lg */}
      <ModalHeader toggle={toggle} className="tw-bg-gray-100 tw-text-white tw-text-lg tw-font-semibold	">Create Venue</ModalHeader>
      <ModalBody className="tw-bg-white">
        <FormGroup>
          <Label for="name" className="tw-text-xs">Name</Label>
          <Input type="text" name="name" id="name" value={venueData.name} onChange={handleChange} className="tw-w-full tw-py-1 tw-px-2 tw-text-gray-600 tw-bg-gray-300 tw-rounded" />
        </FormGroup>
        <FormGroup>
          <Label for="capacity" className="tw-text-xs">Capacity</Label>
          <Input type="number" name="capacity" id="capacity" value={venueData.capacity} onChange={handleChange} className="tw-w-full tw-py-1 tw-px-2 tw-text-gray-600 tw-bg-gray-300 tw-rounded" />
        </FormGroup>
        <FormGroup>
          <Label for="location" className="tw-text-xs">Location</Label>
          <Input type="text" name="location" id="location" value={venueData.location} onChange={handleChange} className="tw-w-full tw-py-1 tw-px-2 tw-text-gray-600 tw-bg-gray-300 tw-rounded" />
        </FormGroup>
        <FormGroup>
          <Label for="type" className="tw-text-xs">Type</Label>
          <Input type="text" name="type" id="type" value={venueData.type} onChange={handleChange} className="tw-w-full tw-py-1 tw-px-2 tw-text-gray-600 tw-bg-gray-300 tw-rounded" />
        </FormGroup>
        <FormGroup>
          <Label for="pricePerHour" className="tw-text-xs">Price Per Hour</Label>
          <Input type="text" name="pricePerHour" id="pricePerHour" value={venueData.pricePerHour} onChange={handleChange} className="tw-w-full tw-py-1 tw-px-2 tw-text-gray-600 tw-bg-gray-300 tw-rounded" />
        </FormGroup>
        <FormGroup>
          <Label for="description" className="tw-text-xs">Description</Label>
          <Input type="textarea" name="description" id="description" value={venueData.description} onChange={handleChange} className="tw-w-full tw-py-1 tw-px-2 tw-text-gray-600 tw-bg-gray-300 tw-rounded" />
        </FormGroup>
        <FormGroup>
          <Label for="image" className="tw-text-xs">Upload Image</Label>
          <CustomInput type="file" name="image" id="image" onChange={handleChange} accept=".png, .jpg, .jpeg" multiple className="tw-w-full tw-py-1 tw-px-2 tw-text-gray-600 tw-bg-gray-300 tw-rounded" />
        </FormGroup>
        <FormGroup>
          <Label for="day" className="tw-text-xs">Select Day</Label>
          <Input type="select" name="day" id="day" value={venueData.day} onChange={handleDayChange} className="tw-w-full tw-py-1 tw-px-2 tw-text-gray-600 tw-bg-gray-300 tw-rounded">
            <option value="">Select a day</option>
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
            <option value="saturday">Saturday</option>
            <option value="sunday">Sunday</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="time" className="tw-text-xs">Time</Label>
          <Input type="time" name="time" id="time" value={venueData.time} onChange={handleTimeChange} className="tw-w-full tw-py-1 tw-px-2 tw-text-gray-600 tw-bg-gray-300 tw-rounded" />
        </FormGroup>
      </ModalBody>
      <ModalFooter className="tw-bg-gray-200">
        <Button color="tw-primary" onClick={() => handleSubmit(venueData)} className="tw-hover:bg-blue-700 tw-text-black tw-font-bold tw-py-1 tw-px-2 tw-rounded mr-2">Submit</Button>{' '}
        <Button color="tw-secondary" onClick={toggle} className="tw-hover:bg-gray-400 tw-text-gray-700 tw-font-bold tw-py-1 tw-px-2 tw-rounded">Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

CreateVenueModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default CreateVenueModal;
