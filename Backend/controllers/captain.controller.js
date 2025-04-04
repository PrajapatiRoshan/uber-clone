const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerCaptain = async function (req, res, next) {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const { fullname, email, password, vehicle } = req.body;

  const isCaptainAlreadyExist = await captainModel.findOne({ email });

  if (isCaptainAlreadyExist) {
    return res.status(400).json({ message: 'Captain already exist' });
  }

  const { color, plate, capacity, vehicleType } = vehicle;
  const { firstname, lastname } = fullname;
  const hashPassword = await captainModel.hashPassword(password);

  const captain = await captainService.createCaptain({
    firstname,
    lastname,
    email,
    password: hashPassword,
    color,
    plate,
    capacity,
    vehicleType,
  });

  const token = captain.generatAuthToken();

  res.status(201).json({
    token,
    captain,
  });
};

module.exports.loginCaptain = async function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const { email, password } = req.body;

  const captain = await captainModel.findOne({ email }).select('+password');

  if (!captain) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const isMatch = await captain.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: 'password incorrect' });
  }

  const token = captain.generatAuthToken();

  res.cookie('token', token);

  res.status(200).json({ token, captain });
};

module.exports.getCaptainProfile = async (req, res, next) => {
  res.status(200).json({ captain: req.captain });
};

module.exports.logoutCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  await blacklistTokenModel.create({ token });
  res.clearCookie('token');
  res.status(201).json({ message: 'Logged out' });
};

module.exports.updateCaptainProfile = async (req, res, next) => {
  let { earnings, distance } = req.body;
  const { captain } = req;

  earnings += Number(captain.totalEarning);
  distance += Number(captain.totalDistance);
  try {
    const captainUp = await captainService.updateEarnig({
      captainId: captain._id,
      earnings,
      distance,
    });
    return res.status(200).json(captainUp);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

