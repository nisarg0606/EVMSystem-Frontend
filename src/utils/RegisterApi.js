
const BASE_URL = "http://localhost:5000/"; 

const RegitserApi = async (credentials) => {
  try {
    console.log("Request URL:", `${BASE_URL}users/register`);
    console.log("Request Body:", credentials);

    const response = await fetch(`${BASE_URL}users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    console.log("Response:", data); // Log response
    
    // Rest of the code...
  } catch (error) {
    console.log("Error registering:", error.message);
    throw error;
  }
};


export default RegitserApi;
