const BASE_URL = "http://localhost:5000/"; 

const BookSlot = async (date, timeSlot) => {
  try {
    // Create a URLSearchParams object to format the body as x-www-form-urlencoded
    const formData = new URLSearchParams();
    formData.append("date", date);
    formData.append("timeSlot", timeSlot);

    const response = await fetch(`${BASE_URL}venueBookings/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Booking failed");
    }

    const data = await response.json();
    localStorage.setItem("token", data.user.token);
    return data;
  } catch (error) {
    console.log("Error booking slot:", error.message);
    throw error;
  }
};

export default BookSlot;
