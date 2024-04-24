const BASE_URL = "http://localhost:5000/";

const CreateActivity = async (activityData) => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error("Token not found in local storage.");
  }
  console.log(activityData)
  const requestOptions = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(activityData)
  };

  try {
    const response = await fetch(`${BASE_URL}activities`, requestOptions);
    if (!response.ok) {
      throw new Error(`Failed to create activity: ${response.status}`);
    }
    console.log("Activity created successfully");
    return response.json();
  } catch (error) {
    console.error('Error creating Activity:', error);
    throw error; 
  }
};

export default CreateActivity;
