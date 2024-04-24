const BASE_URL = "http://localhost:5000/";

const createVenue = async (venueData) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error("Token not found in local storage.");
  }
  console.log(venueData)

  const requestOptions = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(venueData)
  };

  try {
    const response = await fetch(`${BASE_URL}venues`, requestOptions);
    if (!response.ok) {
      throw new Error(`Failed to create venue: ${response.status}`);
    }
    console.log("Venue created successfully");
    return response.json();
  } catch (error) {
    console.error('Error creating venue:', error);
    throw error; 
  }
};

export default createVenue;
