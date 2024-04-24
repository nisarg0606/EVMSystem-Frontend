const BASE_URL = "http://localhost:5000/";

const updateActivity = async (id, data) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("Token not found in local storage.");
    }

    const response = await fetch(`${BASE_URL}activities/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to update activity: ${response.status}`);
    }

    console.log("Activity updated successfully");
    // window.location.reload();
    return response.json();
  } catch (error) {
    console.error('Error updating activity:', error);
    throw error; 
  }
};

export default updateActivity;
