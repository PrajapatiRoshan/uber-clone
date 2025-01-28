const axios = require('axios');
const captainModel = require('../models/captain.model');

// module.exports.getAddressCoordinate = async (address) => {
//   const apiKey = process.env.GOOGLE_MAPS_API;
//   const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
//     address
//   )}&key=${apiKey}`;

//   try {
//     const response = await axios.get(url);
//     if (response.data.status === 'OK') {
//       const location = response.data.results[0].geometry.location;
//       return {
//         ltd: location.lat,
//         lng: location.lng,
//       };
//     } else {
//       throw new Error('Unable to fetch coordinates');
//     }
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

module.exports.getAddressCoordinate = async (address) => {
  console.log(address, 'addddddddddd');

  const apiKey = process.env.OPENCAGE_API_KEY;
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.results.length > 0) {
      const location = response.data.results[0].geometry;
      return {
        ltd: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error('Unable to fetch coordinates');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error('Origin and destination are required');
  }

  try {
    const originCoord = await module.exports.getAddressCoordinate(origin);
    const destinationCoord = await module.exports.getAddressCoordinate(destination);

    const distance = haversine(
      originCoord.ltd,
      originCoord.lng,
      destinationCoord.ltd,
      destinationCoord.lng
    );

    // Assuming average driving speed of 50 km/h for duration estimation
    const duration = (distance / 50) * 60; // Duration in minutes

    return {
      distance: distance, // in km
      duration: duration, // in minutes
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// module.exports.getDistanceTime = async (origin, destination) => {
//   if (!origin || !destination) {
//     throw new Error('Origin and destination are required');
//   }

//   const apiKey = process.env.GOOGLE_MAPS_API;

//   const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
//     origin
//   )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

//   try {
//     const response = await axios.get(url);
//     if (response.data.status === 'OK') {
//       if (response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
//         throw new Error('No routes found');
//       }

//       return response.data.rows[0].elements[0];
//     } else {
//       throw new Error('Unable to fetch distance and time');
//     }
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// };

module.exports.getAutoCompleteSuggestions = async (input) => {
  if (!input) {
    throw new Error('Query is required');
  }

  const apiKey = process.env.OPENCAGE_API_KEY;
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    input
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.results.length > 0) {
      return response.data.results
        .map((prediction) => prediction.formatted)
        .filter((value) => value);
    } else {
      throw new Error('Unable to fetch suggestions');
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// module.exports.getAutoCompleteSuggestions = async (input) => {
//   if (!input) {
//     throw new Error('query is required');
//   }

//   const apiKey = process.env.GOOGLE_MAPS_API;
//   const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
//     input
//   )}&key=${apiKey}`;

//   try {
//     const response = await axios.get(url);
//     if (response.data.status === 'OK') {
//       return response.data.predictions
//         .map((prediction) => prediction.description)
//         .filter((value) => value);
//     } else {
//       throw new Error('Unable to fetch suggestions');
//     }
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// };

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
  // radius in km
  const captains = await captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[ltd, lng], radius / 6371],
      },
    },
  });

  return captains;
};
