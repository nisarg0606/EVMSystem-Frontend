const BASE_URL = "http://localhost:5000/";
const token = localStorage.getItem('token');


const AvailabelSlot = async (id, date) => {
  try {
    // Construct the URL with the given id and date as query parameter
    const url = `${BASE_URL}venueBookings/available/${id}?date=${date}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch available slots");
    }

    // Parse and return the JSON response
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching available slots:", error.message);
    throw error;
  }
};

export default AvailabelSlot;
