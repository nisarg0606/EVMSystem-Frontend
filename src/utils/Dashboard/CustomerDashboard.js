const BASE_URL = "http://localhost:5000/";
const token = localStorage.getItem("token");

const CustomerDashboard = () => {

    return fetch(`${BASE_URL}users/customer/dashboard`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to fetch host dashboard: ${response.status}`);
        }
        return response.json();
    })
    .catch(error => {
        console.error("Error fetching host dashboard:", error.message);
        throw error;
    });
}

export default CustomerDashboard ;
