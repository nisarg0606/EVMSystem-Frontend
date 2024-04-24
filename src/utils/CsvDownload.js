import { REACT_APP_BACKEND_URL } from "../config";
const BASE_URL = REACT_APP_BACKEND_URL + "/";

const CsvDownload = async (id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token not found in local storage.");
  }

  try {
    const response = await fetch(`${BASE_URL}activityBookings/csv/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get participants: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting participants:", error.message);
    throw error;
  }
};

export default CsvDownload;
