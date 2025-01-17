const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');
const userRoute = require('./routes/user.routes');
const captainRoutes = require('./routes/captian.routes');

connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  console.log('working');
  res.send('hellow world');
});

app.use('/users', userRoute);
app.use('/captains', captainRoutes);

module.exports = app;
