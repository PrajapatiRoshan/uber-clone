import React, { useState, useEffect } from 'react';

const LiveTracking = (props) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [currentPosition, setCurrentPosition] = useState({
    lat: 28.6139,
    lng: 77.209,
  }); // Default: New Delhi
  const [destination, setDestination] = useState(); // Example destination: Delhi
  useEffect(() => {
    if (window.mappls) {
      const mapInstance = new window.mappls.Map('map', {
        center: currentPosition,
        zoom: 15,
        fullscreenControl: false,
        scaleControl: false,
      });
      setMap(mapInstance);

      const markerInstance = new window.mappls.Marker({
        position: currentPosition,
        map: mapInstance,
      });
      setMarker(markerInstance);
    }

    const updatePosition = (position) => {
      const { latitude, longitude } = position.coords;
      const newPosition = { lat: latitude, lng: longitude };
      setCurrentPosition(newPosition);
    };
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(updatePosition);
    }
  }, []);

  useEffect(() => {
    let _mapPostion = currentPosition;

    if (props.type === 'user') {
      _mapPostion = destination;
    } else if (props.type === 'captain') {
      _mapPostion = currentPosition;
    }

    if (marker) marker.setPosition(_mapPostion);
    if (map) {
      map.setCenter(_mapPostion);
    }
  }, [map, marker, currentPosition, destination]);

  useEffect(() => {
    if (props?.ride) {
      const _locationStart = {
        lat: props.ride.startLocation.ltd,
        lng: props.ride.startLocation.lng,
      };
      const _locationEnd = {
        lat: props.ride.endLocation.ltd,
        lng: props.ride.endLocation.lng,
      };
      setDestination(_locationEnd);
      setCurrentPosition(_locationStart);
    }
  }, [props?.ride]);

  // useEffect(() => {
  //   const drawRoute = (origin, destination) => {
  //     if (!window?.mappls || !window?.mappls?.direction) return;
  //     window.mappls.direction({
  //       map: map,
  //       start: `${origin.lat},${origin.lng}`,
  //       end: `${destination.lat},${destination.lng}`,
  //       fitBounds: true,
  //       callback: function (response) {
  //         console.log('Route Data:', response);
  //       },
  //     });
  //   };

  //   if (destination && marker) {
  //     // marker?.setPosition({ lat: destination.ltd, lng: destination.lng });
  //     drawRoute(currentPosition, destination);
  //   }
  // }, [destination]);

  return <div id="map" className="w-full h-full"></div>;
};

export default LiveTracking;

