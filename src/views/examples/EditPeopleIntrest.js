import { REACT_APP_BACKEND_URL } from "../config";
const BASE_URL = REACT_APP_BACKEND_URL + "/";

const EditPeopleIntrest = async (interested) => {
  try {
    const token = localStorage.getItem("token");
    const interestedIn = {
      interested,
    };
    if (!token) {
      throw new Error("Token not found in local storage.");
    }

    const response = await fetch(`${BASE_URL}users/interests`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(interestedIn),
    });

    if (!response.ok) {
      throw new Error(`Failed to update venue: ${response.status}`);
    }

    console.log("Venue updated successfully");
    window.location.reload();
    return response.json();
  } catch (error) {
    console.error("Error updating venue:", error);
    throw error;
  }
};

export default EditPeopleIntrest;
