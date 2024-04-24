import { REACT_APP_BACKEND_URL } from "../config";
const BASE_URL = REACT_APP_BACKEND_URL + "/";

const fun2fa = async (code) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token not found in local storage.");
  }

  return fetch(`${BASE_URL}users/2fa`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code: code }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to Enable 2FA: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error while Enableing 2FA:", error.message);
      throw error;
    });
};

export default fun2fa;
