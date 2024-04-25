import { loadStripe } from "@stripe/stripe-js";
import { REACT_APP_BACKEND_URL, REACT_APP_SITE_KEY } from "../config";

const token = localStorage.getItem("token");

const BookActivity = async (bookingQuantity, id, price, phone) => {
  try {
    // console.log("id", id);
    console.log("phone", phone);
    const requestBody = {
      activityId: id,
      bookingQuantity: bookingQuantity,
      price: price,
      phone: phone,
    };

    console.log("requestBody", requestBody);
    const stripe = await loadStripe(
      "pk_test_51OyLXAG1gYMjrZo3DQVWWx9HImrkKGSsb8qO8xiCd3kUOEahrDA7AlgWY7cKTsrHEtZXMQSk49a7AY1qsXrfnFqw00LJN7elMY"
    );

    // Send the POST request to the API endpoint
    const response = await fetch(`${REACT_APP_BACKEND_URL}/activityBookings/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody), // Convert request body to JSON
    });

    const session = await response.json();

    // When the customer clicks on the button, redirect them to Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.sessionId,
    });

    if (result.error) {
      console.error(result.error.message);
    }

    // Check the response status
    if (!response.ok) {
      throw new Error("Booking failed");
    }

    const data = session;

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
