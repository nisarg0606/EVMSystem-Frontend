const BASE_URL = "http://localhost:5000/";
const token = localStorage.getItem('token');
const userRole = localStorage.getItem('role');

const fetchVenues = (search) => {
  let url;
  if (userRole === 'customer') {
    if (search) {
      url = new URL(`${BASE_URL}venues/search`);
      url.searchParams.append('search', search);
    } else {
      url = new URL(`${BASE_URL}venues`);
    }
  } else {
    if (search) {
      url = new URL(`${BASE_URL}venues/myvenues/search`);
      url.searchParams.append('search', search);
    } else {
      url = new URL(`${BASE_URL}venues/myvenues`);
    }
  }

  return fetch(url.toString(), {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Failed to fetch venues: ${response.status}`);
    }
    return response.json();
  })
  .catch(error => {
    console.error("Error fetching venues:", error.message);
    throw error;
  });
};

export default fetchVenues;
