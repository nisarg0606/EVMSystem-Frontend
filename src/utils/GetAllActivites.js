const BASE_URL = "http://localhost:5000/";

const GetAllActivites = () => {

    return fetch(`${BASE_URL}activities/`, {
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
}

export default GetAllActivites ;
