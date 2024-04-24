import { REACT_APP_BACKEND_URL } from "../config";
const BASE_URL = REACT_APP_BACKEND_URL + "/";

const DeleteVenue = async (id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token not found in local storage.");
  }

  try {
    const response = await fetch(`${BASE_URL}venues/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to Delete venues: ${response.status}`);
    }
    console.log("Venue deleted successfully ");
    return await response.json();
  } catch (error) {
    console.error("Error Deleteing venues:", error.message);
    throw error;
  }
};

export default DeleteVenue;
