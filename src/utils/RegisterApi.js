
const BASE_URL = "http://localhost:5000/"; 

const RegitserApi = async (credentials) => {
  try {
    const response = await fetch(`${BASE_URL}users/register`, {
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
    localStorage.setItem("token",data.user.token)
    return data;
  } catch (error) {
    console.log("Error logging in:", error.message);
    throw error;
  }
};

export default RegitserApi;
