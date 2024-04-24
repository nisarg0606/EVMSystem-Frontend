import { REACT_APP_BACKEND_URL } from "../config";
const BASE_URL = REACT_APP_BACKEND_URL + "/";

const GetQRcode = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token not found in local storage.");
  }

  try {
    const response = await fetch(`${BASE_URL}users/qrcode`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch QR Code: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching  QR Code:", error.message);
    throw error;
  }
};

export default GetQRcode;
