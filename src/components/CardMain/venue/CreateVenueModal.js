import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Button, CustomInput, Form, Row, Col,  } from 'reactstrap';
import PropTypes from 'prop-types';

const CreateVenueModal = ({ isOpen, toggle, handleSubmit }) => {
  const [venueData, setVenueData] = useState({
    name: "",
    description: "",
    capacity: 0,
    location: "",
    image: null,
    type: "",
    price: 0,
    timings: [],
  });
  const [newDay, setNewDay] = useState("");
  const [newSlot, setNewSlot] = useState({ from: "", to: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenueData({
      ...venueData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setVenueData({
      ...venueData,
      image: file,
    });
  };

  const handleAddDay = () => {
    if (newDay) {
      setVenueData({
        ...venueData,
        timings: [...venueData.timings, { day: newDay, slots: [newSlot] }],
      });
      setNewDay("");
      setNewSlot({ from: "", to: "" });
    }
  };

  const handleAddSlot = (dayIndex) => {
    const updatedTimings = [...venueData.timings];
    updatedTimings[dayIndex].slots.push(newSlot);
    setVenueData({
      ...venueData,
      timings: updatedTimings,
    });
    setNewSlot({ from: "", to: "" });
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="tw-max-w-4xl tw-m-auto tw-p-6"> {/* Adjusted width to tw-max-w-lg */}
      <ModalHeader toggle={toggle} className="tw-bg-gray-100 tw-text-white tw-text-lg tw-font-semibold	">Create Venue</ModalHeader>
      <ModalBody className="tw-bg-white">
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md="6">
              <FormGroup>
                <Label for="name">Name:</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={venueData.name}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="description">Description:</Label>
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  value={venueData.description}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="capacity">Capacity:</Label>
                <Input
                  type="number"
                  name="capacity"
                  id="capacity"
                  value={venueData.capacity}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="location">Location:</Label>
                <Input
                  type="text"
                  name="location"
                  id="location"
                  value={venueData.location}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="image">Image:</Label>
                <Input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="type">Type:</Label>
                <Input
                  type="text"
                  name="type"
                  id="type"
                  value={venueData.type}
                  onChange={handleChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="price">Price Per Hour:</Label>
                <Input
                  type="number"
                  name="price"
                  id="price"
                  value={venueData.price}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label for="newDay">Select Day:</Label>
                <Input
                  type="select"
                  name="newDay"
                  id="newDay"
                  value={newDay}
                  onChange={(e) => setNewDay(e.target.value)}
                >
                  <option value="">Select Day</option>
                  <option value="monday">Monday</option>
                  <option value="tuesday">Tuesday</option>
                  <option value="wednesday">Wednesday</option>
                  <option value="thursday">Thursday</option>
                  <option value="friday">Friday</option>
                  <option value="saturday">Saturday</option>
                  <option value="sunday">Sunday</option>
                </Input>
              </FormGroup>
              <Button type="button" color="primary" onClick={handleAddDay}>
                Add Day
              </Button>

              {venueData.timings.map((day, dayIndex) => (
                <div key={dayIndex}>
                  <h4>{day.day}</h4>
                  {day.slots.map((slot, slotIndex) => (
                    <div key={slotIndex}>
                      <Input
                        type="text"
                        value={slot.from}
                        onChange={(e) => {
                          const updatedTimings = [...venueData.timings];
                          updatedTimings[dayIndex].slots[slotIndex].from =
                            e.target.value;
                          setVenueData({
                            ...venueData,
                            timings: updatedTimings,
                          });
                        }}
                        placeholder="From"
                      />
                      {" - "}
                      <Input
                        type="text"
                        value={slot.to}
                        onChange={(e) => {
                          const updatedTimings = [...venueData.timings];
                          updatedTimings[dayIndex].slots[slotIndex].to =
                            e.target.value;
                          setVenueData({
                            ...venueData,
                            timings: updatedTimings,
                          });
                        }}
                        placeholder="To"
                      />
                    </div>
                  ))}
                  <Button
                    type="button"
                    color="secondary"
                    onClick={() => handleAddSlot(dayIndex)}
                  >
                    Add Slot
                  </Button>
                </div>
              ))}
            </Col>
          </Row>
          <Button type="submit" color="success">
            Submit
          </Button>
        </Form>
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
