const BASE_URL = "http://localhost:5000/";
const token = localStorage.getItem("token");

const GetMyActivities = () => {
    
    return fetch(`${BASE_URL}activities/myactivities`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to fetch venues: ${response.status}`);
        }
        return response.json();
    })
    .catch(error => {
        console.error("Error fetching venues:", error.message);
        throw error;
    });
}

export default GetMyActivities ;
