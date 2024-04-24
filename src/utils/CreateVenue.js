import { REACT_APP_BACKEND_URL } from "../config";
const BASE_URL = REACT_APP_BACKEND_URL + "/";

const createVenue = async (venueData) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token not found in local storage.");
  }

  const formData = new FormData();
  Object.entries(venueData).forEach(([key, value]) => {
    if (key === "timings") {
      value.forEach((timing) => {
        formData.append("timings", JSON.stringify(timing));
      });
    } else {
      formData.append(key, value);
    }
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  };

  try {
    console.log("Request Options", requestOptions);
    const response = await fetch(`${BASE_URL}venues`, requestOptions);
    if (!response.ok) {
      console.error("Failed to create venue:", response);
      throw new Error("Failed to create venue");
    }
    console.log("Venue created successfully");
    return response.json();
  } catch (error) {
    console.error("Error creating venue:", error);
    throw error;
  }
};

export default createVenue;
