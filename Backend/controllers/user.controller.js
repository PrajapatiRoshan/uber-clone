const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  console.log(req.body);

  const { fullname, email, password } = req.body;
  const { firstname, lastname } = fullname;
  const hashPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstname,
    lastname,
    email,
    password: hashPassword,
  });

  const token = user.generateAuthToken();

  res.status(200).json({
    token,
    user,
  });
};
