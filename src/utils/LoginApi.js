import Cookies from "js-cookie";

import { REACT_APP_BACKEND_URL } from "../config";
const BASE_URL = REACT_APP_BACKEND_URL + "/";

const loginApi = async (credentials) => {
  try {
    const response = await fetch(`${BASE_URL}users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    const token = data.user.token;
    const pId = data.user._id;
    const role = data.user.role;

    // Set the token as a cookie with a 1-day expiration
    Cookies.set("token", token, { expires: 1 });
    localStorage.setItem("token", token);
    localStorage.setItem("pId", pId);
    localStorage.setItem("role", role);

    return data;
  } catch (error) {
    console.log("Error logging in:", error.message);
    throw error;
  }
};

export default loginApi;
