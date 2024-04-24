import { REACT_APP_BACKEND_URL } from "../config";
const BASE_URL = REACT_APP_BACKEND_URL + "/";
const token = localStorage.getItem("token");
const userRole = localStorage.getItem("role");

const fetchVenues = async (search) => {
  let url;
  if (userRole === "customer") {
    if (search) {
      url = new URL(`${BASE_URL}venues/search`);
      url.searchParams.append("search", search);
    } else {
      url = new URL(`${BASE_URL}venues`);
    }
  } else {
    if (search) {
      url = new URL(`${BASE_URL}venues/myvenues/search`);
      url.searchParams.append("search", search);
    } else {
      url = new URL(`${BASE_URL}venues/myvenues`);
    }
  }

  try {
    const response = await fetch(url.toString(), {
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

export default fetchVenues;
