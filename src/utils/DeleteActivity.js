const BASE_URL = "http://localhost:5000/";

const DeleteActivity = (id) => {
    const token = localStorage.getItem("token");
    
    if (!token) {
        throw new Error("Token not found in local storage.");
    }

    return fetch(`${BASE_URL}activities/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to Delete activity : ${response.status}`);
        }
        console.log("activity deleted successfully ")
        return response.json();
    })
    .catch(error => {
        console.error("Error Deleteing activity:", error.message);
        throw error;
    });
}

export default DeleteActivity ;