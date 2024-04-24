const BASE_URL = "http://localhost:5000/";

const Disable2fa = async ()  => {
    const token = localStorage.getItem("token");
    
    if (!token) {
        throw new Error("Token not found in local storage.");
    }

    return fetch(`${BASE_URL}users/disable2fa`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to disable 2FA: ${response.status}`);
        }
        return response.json();
    })
    .catch(error => {
        console.error("Error while disable the 2FA:", error.message);
        throw error;
    });
}

export default Disable2fa ;
