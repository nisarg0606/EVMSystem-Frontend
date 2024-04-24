import { REACT_APP_BACKEND_URL } from "../config";
const BASE_URL = REACT_APP_BACKEND_URL + "/";
const updateActivity = async (id, data) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found in local storage.");
    }

    const response = await fetch(`${BASE_URL}activities/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to update activity: ${response.status}`);
    }

    console.log("Activity updated successfully");
    // window.location.reload();
    return response.json();
  } catch (error) {
    console.error("Error updating activity:", error);
    throw error;
  }
};

export default updateActivity;
