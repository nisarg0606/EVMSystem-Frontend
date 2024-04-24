const BASE_URL = "http://localhost:5000/";

const GetQRcode = () => {
    const token = localStorage.getItem("token");
    
    if (!token) {
        throw new Error("Token not found in local storage.");
    }

    return fetch(`${BASE_URL}users/qrcode`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to fetch QR Code: ${response.status}`);
        }
        return response.json();
    })
    .catch(error => {
        console.error("Error fetching  QR Code:", error.message);
        throw error;
    });
}

export default GetQRcode ;
