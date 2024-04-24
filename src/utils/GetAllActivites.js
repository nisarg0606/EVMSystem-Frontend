import { REACT_APP_BACKEND_URL } from "../config";
const BASE_URL = REACT_APP_BACKEND_URL + "/";

const GetAllActivites = async () => {
  try {
    const response = await fetch(`${BASE_URL}activities/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch activities: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching activities:", error.message);
    throw error;
  }
};

export default GetAllActivites;
