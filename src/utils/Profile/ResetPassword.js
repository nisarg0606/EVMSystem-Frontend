
const BASE_URL = "http://localhost:5000/";
const token = localStorage.getItem('token');

const resetPassword = async (credentials) => {
  try {
    const response = await fetch(`${BASE_URL}users/resetpassword`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("reset password failed");
    }


    return response;
  } catch (error) {
    console.log("Error reset password in:", error.message);
    throw error;
  }
};

export default resetPassword;
