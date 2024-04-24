const BASE_URL = "http://localhost:5000/";

const EditPeopleIntrest = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("Token not found in local storage.");
    }

    const response = await fetch(`${BASE_URL}users/interests`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(interestedIn),
    });

    if (!response.ok) {
      throw new Error(`Failed to update venue: ${response.status}`);
    }

    console.log("Venue updated successfully");
    window.location.reload();
    return response.json();
  } catch (error) {
    console.error('Error updating venue:', error);
    throw error; 
  }
};

export default EditPeopleIntrest;
