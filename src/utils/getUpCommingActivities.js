import { REACT_APP_BACKEND_URL } from "../config";
const BASE_URL = REACT_APP_BACKEND_URL + "/";
const token = localStorage.getItem("token");
const GetUpCommingActivites = async () => {
  try {
    const response = await fetch(`${BASE_URL}venueBookings/upcoming`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch upcomming activities: ${response.status}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching upcomming activities:", error.message);
    throw error;
  }
};

export default GetUpCommingActivites;
