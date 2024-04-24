import React, { useState } from 'react';
import axios from 'axios';
import CreateActivity from 'utils/Profile/CreateActivity';

function CreateActivities() {
  // State to hold form inputs
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [venue, setVenue] = useState('');
  const [typeOfActivity, setTypeOfActivity] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [participantsLimit, setParticipantsLimit] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  
  // State to hold response feedback
  const [responseMessage, setResponseMessage] = useState('');
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare the form data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('venue', venue);
    formData.append('type_of_activity', typeOfActivity);
    formData.append('date', date);
    formData.append('start_time', startTime);
    formData.append('end_time', endTime);
    formData.append('participants_limit', participantsLimit);
    formData.append('price', price);
    formData.append('image', image);  // File upload
    
    try {
      // Make the API call
        try {
            const createVenue =CreateActivity(formData)
        } catch (error) {
            console.error('Error creating Activity:', error.message);
        }
      // Handle success
      setResponseMessage('Activity created successfully!');
    } catch (error) {
      // Handle error
      setResponseMessage(`Error: ${error.response ? error.response.data.message : error.message}`);
    }
  };
  
  return (
    <div>
      <h2>Create Activity</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Venue:</label>
          <input type="text" value={venue} onChange={(e) => setVenue(e.target.value)} required />
        </div>
        <div>
          <label>Type of Activity:</label>
          <input type="text" value={typeOfActivity} onChange={(e) => setTypeOfActivity(e.target.value)} required />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div>
          <label>Start Time:</label>
          <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
        </div>
        <div>
          <label>End Time:</label>
          <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
        </div>
        <div>
          <label>Participants Limit:</label>
          <input type="number" value={participantsLimit} onChange={(e) => setParticipantsLimit(Number(e.target.value))} required />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
        </div>
        <button type="submit">Create Activity</button>
      </form>
      
      {/* Display response message */}
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default CreateActivities;
