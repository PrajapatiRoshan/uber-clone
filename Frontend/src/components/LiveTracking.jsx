import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet'; // Import Leaflet
import OpenCageClient from 'opencage-api-client'; // Import OpenCage API client

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(center);
  const [address, setAddress] = useState('');
  const mapRef = useRef(null); // Ref to hold the map instance
  const markerRef = useRef(null); // Ref to hold the marker instance

  // Set up the Leaflet map
  useEffect(() => {
    // Initialize map only once
    const map = L.map('map').setView([currentPosition.lat, currentPosition.lng], 15); // Initialize map with center position
    mapRef.current = map; // Store map instance in ref

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map); // Use OpenStreetMap tiles

    const marker = L.marker([currentPosition.lat, currentPosition.lng]).addTo(map); // Add marker for position
    markerRef.current = marker; // Store marker instance in ref

    // Function to update position and address
    const updatePosition = async () => {
      try {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude = 50, longitude = 10 } = position.coords;
          setCurrentPosition({
            lat: latitude,
            lng: longitude,
          });

          // Reverse geocode using OpenCage API
          const response = await OpenCageClient.geocode({
            q: `${latitude},${longitude}`,
            key: import.meta.env.VITE_OPENCAGE_API_KEY, // Assuming API key is stored in environment variable
          });

          if (response.results.length > 0) {
            const location = response.results[0].formatted;
            setAddress(location);
            console.log('Address:', location); // Logs the address
          }

          // Update marker position and map center
          markerRef.current.setLatLng([latitude, longitude]);
          mapRef.current.setView([latitude, longitude], 15); // Update map center with new position
        });
      } catch (error) {
        console.error('Error retrieving position or geocoding:', error);
      }
    };

    updatePosition(); // Initial position update
    const intervalId = setInterval(updatePosition, 10000); // Update every 10 seconds

    return () => {
      clearInterval(intervalId); // Clean up interval on unmount
      map.remove(); // Clean up the map on unmount
    };
  }, []); // Empty dependency array, run only on mount and unmount

  return (
    <div>
      <div id="map" style={containerStyle}></div> {/* Leaflet map container */}
      <div>
        <h3>Current Address:</h3>
        <p>{address}</p>
      </div>
    </div>
  );
};

export default LiveTracking;
