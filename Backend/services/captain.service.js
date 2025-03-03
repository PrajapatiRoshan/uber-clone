const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({
  firstname,
  lastname,
  email,
  password,
  color,
  plate,
  capacity,
  vehicleType,
}) => {
  if (
    !firstname ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !vehicleType
  ) {
    throw new Error('All fields are required');
  }
  const captain = captainModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    vehicle: {
      color,
      plate,
      capacity,
      vehicleType,
    },
  });
  return captain;
};

module.exports.updateEarnig = async ({ captainId, earnings, distance }) => {
  if (!captainId) {
    throw new Error('Captain id is required');
  }

  const che = await captainModel.findOneAndUpdate(
    { _id: captainId },
    {
      $inc: { totalTrips: 1 },
      $set: {
        totalEarning: earnings,
        totalDistance: distance,
      },
    },
    { new: true }
  );

  const captain = await captainModel.findOne({ _id: captainId });
  return captain;
};

