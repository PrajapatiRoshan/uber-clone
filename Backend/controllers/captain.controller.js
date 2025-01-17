const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');

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
