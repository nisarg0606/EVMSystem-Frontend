import { REACT_APP_BACKEND_URL } from "../config";
const BASE_URL = REACT_APP_BACKEND_URL + "/";
const DeleteActivity = async (id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token not found in local storage.");
  }

  try {
    const response = await fetch(`${BASE_URL}activities/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to Delete activity : ${response.status}`);
    }
    console.log("activity deleted successfully ");
    return await response.json();
  } catch (error) {
    console.error("Error Deleteing activity:", error.message);
    throw error;
  }
};

export default DeleteActivity;
