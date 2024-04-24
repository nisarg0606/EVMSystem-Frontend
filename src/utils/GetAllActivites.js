const BASE_URL = "http://localhost:5000/";

// Function to fetch all activities
const GetAllActivites = () => {
    const token = localStorage.getItem("token");
    
    if (!token) {
        throw new Error("Token not found in local storage.");
    }

    return fetch(`${BASE_URL}venues/`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to fetch activities: ${response.status}`);
        }
        return response.json();
    })
    .catch(error => {
        console.error("Error fetching activities:", error.message);
        throw error;
    });
}

export default GetAllActivites ;
