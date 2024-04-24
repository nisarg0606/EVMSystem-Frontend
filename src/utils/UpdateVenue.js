import { REACT_APP_BACKEND_URL } from "../config";
const BASE_URL = REACT_APP_BACKEND_URL + "/";
const updateVenue = async (id, venueData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found in local storage.");
    }

    const response = await fetch(`${BASE_URL}venues/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(venueData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update venue: ${response.status}`);
    }

    console.log("Venue updated successfully");
    return response.json();
  } catch (error) {
    console.error("Error updating venue:", error);
    throw error;
  }
};

export default updateVenue;
