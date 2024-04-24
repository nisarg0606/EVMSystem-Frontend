import React, { useEffect, useState } from 'react';

const BASE_URL = "http://localhost:5000/";

function Test() {
  const [venues, setVenues] = useState([]);
  
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch(`${BASE_URL}venues`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch venues');
        }
        const venuesData = await response.json();
        setVenues(venuesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVenues();
  }, []); 

  return (
    <div>
      <h1>Venues</h1>
      <ul>
        {venues.map(venue => (
          <li key={venue._id}>{venue.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Test;
