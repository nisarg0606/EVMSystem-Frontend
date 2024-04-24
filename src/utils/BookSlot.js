import { REACT_APP_BACKEND_URL } from "../config";
const BASE_URL = REACT_APP_BACKEND_URL + "/";
const token = localStorage.getItem("token");

const BookSlot = async (selectedDate, selectedTimeSlots, id) => {
  try {
    //   console.log("id",id)
    const requestBody = {
      date: selectedDate,
      timeSlot: selectedTimeSlots,
    };

    // Send the POST request to the API endpoint
    const response = await fetch(`${BASE_URL}venueBookings/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody), // Convert request body to JSON
    });

    // Check the response status
    if (!response.ok) {
      throw new Error("Booking failed");
    }

    // Parse JSON response data
    const data = await response.json();

    // Update token in local storage if necessary
    if (data.user && data.user.token) {
      localStorage.setItem("token", data.user.token);
    }

    // Return the response data
    return data;
  } catch (error) {
    // Log error and rethrow it
    console.log("Error booking slot:", error.message);
    throw error;
  }
};

export default BookSlot;
