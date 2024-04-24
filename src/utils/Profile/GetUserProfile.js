const BASE_URL = "http://localhost:5000/";
const token = localStorage.getItem('token');

const GetUserProfile = () => {

    return fetch(`${BASE_URL}users/profile`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to fetch user: ${response.status}`);
        }
        return response.json();
    })
    .catch(error => {
        console.error("Error fetching user:", error.message);
        throw error;
    });
}

export default GetUserProfile ;
