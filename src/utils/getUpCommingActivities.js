const BASE_URL = "http://localhost:5000/";
const token = localStorage.getItem("token");

const GetUpCommingActivites = () => {

    return fetch(`${BASE_URL}venueBookings/upcoming`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to fetch upcomming activities: ${response.status}`);
        }
        return response.json();
    })
    .catch(error => {
        console.error("Error fetching upcomming activities:", error.message);
        throw error;
    });
}

export default GetUpCommingActivites ;
