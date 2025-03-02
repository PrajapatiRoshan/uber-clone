# Uber Clone Project

## Overview

This project is a clone of the Uber application, built to demonstrate a full-stack application with a focus on backend services and frontend integration. The project includes features such as address geocoding, distance and time calculation, autocomplete suggestions, and finding captains within a radius.

## Libraries and Technologies Used

### Backend

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express.js**: Web framework for Node.js.
- **Axios**: Promise-based HTTP client for making API requests.
- **Mongoose**: MongoDB object modeling tool.
- **dotenv**: Module to load environment variables from a `.env` file.

### Frontend

- **React.js**: JavaScript library for building user interfaces.
- **Redux**: State management library for JavaScript apps.
- **Axios**: Promise-based HTTP client for making API requests.

## Environment Variables

Create a `.env` file in the root directory of the project and add the following environment variables:

```
MAPMYINDIA_API_KEY=your_mapmyindia_api_key
MONGODB_URI=your_mongodb_connection_string
PORT=your_server_port
```

## Backend Services and Routes

### Address Geocoding

**Endpoint**: `/api/maps/address-coordinate`  
**Method**: `POST`  
**Description**: Get the latitude and longitude of a given address.  
**Request Body**:

```json
{
  "address": "string"
}
```

**Response**:

```json
{
  "ltd": "number",
  "lng": "number"
}
```

**Example**:

```sh
curl -X POST http://localhost:your_server_port/api/maps/address-coordinate -H "Content-Type: application/json" -d '{"address": "1600 Amphitheatre Parkway, Mountain View, CA"}'
```

### Distance and Time Calculation

**Endpoint**: `/api/maps/distance-time`  
**Method**: `POST`  
**Description**: Calculate the distance and estimated time between two locations.  
**Request Body**:

```json
{
  "origin": "string",
  "destination": "string"
}
```

**Response**:

```json
{
  "distance": "number",
  "duration": "number",
  "originCoord": {
    "ltd": "number",
    "lng": "number"
  },
  "destinationCoord": {
    "ltd": "number",
    "lng": "number"
  }
}
```

**Example**:

```sh
curl -X POST http://localhost:your_server_port/api/maps/distance-time -H "Content-Type: application/json" -d '{"origin": "New York, NY", "destination": "Los Angeles, CA"}'
```

### Autocomplete Suggestions

**Endpoint**: `/api/maps/autocomplete`  
**Method**: `POST`  
**Description**: Get autocomplete suggestions for a given input.  
**Request Body**:

```json
{
  "input": "string"
}
```

**Response**:

```json
["string"]
```

**Example**:

```sh
curl -X POST http://localhost:your_server_port/api/maps/autocomplete -H "Content-Type: application/json" -d '{"input": "Bhandup"}'
```

### Captains in the Radius

**Endpoint**: `/api/maps/captains-in-radius`  
**Method**: `POST`  
**Description**: Find captains within a specified radius from a given location.  
**Request Body**:

```json
{
  "ltd": "number",
  "lng": "number",
  "radius": "number"
}
```

**Response**:

```json
[
  {
    "id": "string",
    "name": "string",
    "location": {
      "ltd": "number",
      "lng": "number"
    }
  }
]
```

**Example**:

```sh
curl -X POST http://localhost:your_server_port/api/maps/captains-in-radius -H "Content-Type: application/json" -d '{"ltd": 19.2183, "lng": 72.9781, "radius": 5}'
```

## How to Run the Project

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/uber-clone.git
   ```

2. Navigate to the project directory:

   ```sh
   cd uber-clone
   ```

3. Install the dependencies for both backend and frontend:

   ```sh
   npm install
   cd frontend
   npm install
   cd ..
   ```

4. Create a `.env` file in the root directory and add the required environment variables.

5. Start the backend server:

   ```sh
   npm run start
   ```

6. Start the frontend development server:
   ```sh
   cd frontend
   npm start
   ```

## Project Structure

```
uber-clone/
├── Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── app.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
├── .env
├── package.json
└── readme.md
```

## Conclusion

This project demonstrates a full-stack application with backend services for geocoding, distance calculation, and autocomplete suggestions, integrated with a frontend built using React and Redux. The project is designed to be easily understandable and extendable for further development.

