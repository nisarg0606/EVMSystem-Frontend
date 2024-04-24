const BASE_URL = "http://localhost:5000/";

const DeleteVenue = (id) => {
    const token = localStorage.getItem("token");
    
    if (!token) {
        throw new Error("Token not found in local storage.");
    }

    return fetch(`${BASE_URL}venues/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to Delete venues: ${response.status}`);
        }
        console.log("Venue deleted successfully ")
        return response.json();
    })
    .catch(error => {
        console.error("Error Deleteing venues:", error.message);
        throw error;
    });
}

export default DeleteVenue ;


