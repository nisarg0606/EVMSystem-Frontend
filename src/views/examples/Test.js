import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const BASE_URL = "http://localhost:5000/";

function Test() {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const token = Cookies.get('token');

        const response = await fetch(`${BASE_URL}venues/`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, 
            "credentials": "same-origin"
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch venues');
        }

        const responseData = await response.json();
        // Extracting venues from the response object
        const venuesArray = Object.values(responseData.venues);
        setVenues(venuesArray);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVenues();
  }, []);

  return (
    <div>
    
    </div>
  );
}

export default Test;
