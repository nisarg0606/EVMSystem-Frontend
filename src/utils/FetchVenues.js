const BASE_URL = "http://localhost:5000/";
const token = localStorage.getItem('token');
const userRole = localStorage.getItem('role');

const fetchVenues = (name, description) => {
  const url = new URL(`${BASE_URL}venues`);

  if (name && description) {
    url.pathname += '/search';
    url.searchParams.append('name', name);
    url.searchParams.append('description', description);
  }

  // Conditional logic based on userRole
  const targetPath = (userRole === 'customer') ? '' : '/myvenues';
  url.pathname += targetPath;

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
