import { REACT_APP_BACKEND_URL } from "../config";
const BASE_URL = REACT_APP_BACKEND_URL + "/";
const GetVenueById = async () => {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("pId");

  if (!token) {
    throw new Error("Token not found in local storage.");
  }

  try {
    const response = await fetch(`${BASE_URL}venues/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch venues: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching venues:", error.message);
    throw error;
  }
};

export default GetVenueById;
