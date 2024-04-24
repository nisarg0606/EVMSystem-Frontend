import { REACT_APP_BACKEND_URL } from "../config";
const BASE_URL = REACT_APP_BACKEND_URL + "/";
const token = localStorage.getItem("token");

const CustomerDashboard = async () => {
  try {
    const response = await fetch(`${BASE_URL}users/customer/dashboard`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch host dashboard: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching host dashboard:", error.message);
    throw error;
  }
};

export default CustomerDashboard;
