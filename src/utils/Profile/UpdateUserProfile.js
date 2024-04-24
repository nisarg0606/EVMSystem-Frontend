const BASE_URL = "http://localhost:5000/";
const token = localStorage.getItem('token');

const UpdateUserProfile = (updatedProfileData) => {
    return fetch(`${BASE_URL}users/profile`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedProfileData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to update user profile: ${response.status}`);
        }
        return response.json();
    })
    .catch(error => {
        console.error("Error updating user profile:", error.message);
        throw error;
    });
}

export default UpdateUserProfile;
