const BASE_URL = "http://localhost:5000/";
const token = localStorage.getItem('token');

const BookActivity = async (bookingQuantity, id) => {
    try {
      console.log("id",id)
        const requestBody = {
            activityId: id, 
            bookingQuantity: bookingQuantity 
        };

        // Send the POST request to the API endpoint
        const response = await fetch(`${BASE_URL}activityBookings/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(requestBody), // Convert request body to JSON
        });

        // Check the response status
        if (!response.ok) {
            throw new Error("Booking failed");
        }

        // Parse JSON response data
        const data = await response.json();

        // Update token in local storage if necessary
        if (data.user && data.user.token) {
            localStorage.setItem("token", data.user.token);
        }

        // Return the response data
        return data;
    } catch (error) {
        // Log error and rethrow it
        console.log("Error booking slot:", error.message);
        throw error;
    }
};

export default BookActivity;
