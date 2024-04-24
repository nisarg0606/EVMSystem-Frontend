const BASE_URL = "http://localhost:5000/";
const token = localStorage.getItem("token");
const userRole = localStorage.getItem("role");

const fetchActivities = () => {
    // Check the user's role
    if (userRole === "customer") {
        // If the user is a customer, hit the activities API
        return fetch(`${BASE_URL}activities`, {
            method: "GET",
            headers: {
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
    } else {
        // If the user is not a customer, hit the myactivities API
        return fetch(`${BASE_URL}activities/myactivities`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch my activities: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error("Error fetching my activities:", error.message);
            throw error;
        });
    }
}

export default fetchActivities;
