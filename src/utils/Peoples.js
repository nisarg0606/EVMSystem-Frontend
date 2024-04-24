import { REACT_APP_BACKEND_URL } from "../config";
const BASE_URL = REACT_APP_BACKEND_URL + "/";
const token = localStorage.getItem("token");

const Peoples = () => {
  return fetch(`${BASE_URL}users/similarInterests`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch venues: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching venues:", error.message);
      throw error;
    });
};

export default Peoples;
