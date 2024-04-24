import { REACT_APP_BACKEND_URL } from "../config";
const BASE_URL = REACT_APP_BACKEND_URL + "/";
const token = localStorage.getItem("token");
const userRole = localStorage.getItem("role");

const fetchActivities = async (search) => {
  let url;
  // Check if search parameter is provided
  if (search) {
    url = `${BASE_URL}activities/search?search=${encodeURIComponent(search)}`;
  } else if (userRole === "customer") {
    url = `${BASE_URL}activities`;
  } else {
    url = `${BASE_URL}activities/myactivities`;
  }

  // Constructing fetch options
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Add Authorization header if user is not a customer
  if (userRole !== "customer") {
    options.headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch activities: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching activities:", error.message);
    throw error;
  }
};

export default fetchActivities;
