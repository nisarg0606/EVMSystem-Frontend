import { REACT_APP_BACKEND_URL } from "../config";
const BASE_URL = REACT_APP_BACKEND_URL + "/";
const ShowBooking = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found in local storage.");
    }

    const response = await fetch(`${BASE_URL}venueBookings/venue/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default ShowBooking;
