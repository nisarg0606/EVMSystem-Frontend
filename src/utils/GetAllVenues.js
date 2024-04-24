import { REACT_APP_BACKEND_URL } from "../config";
const BASE_URL = REACT_APP_BACKEND_URL + "/";

const GetAllVeniues = async () => {
  try {
    const response = await fetch(`${BASE_URL}venues/`, {
      method: "GET",
      headers: {
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

export default GetAllVeniues;
