const Farmer = require("../models/farmer");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");

// Resister farmer           => /api/v1/farmer/register
exports.registerFarmer = catchAsyncError(async (req, res, next) => {
  const {
    firstName,
    lastName,
    dob,
    contactNo,
    email,
    aadhar,
    land,
    password,
    crops,
  } = req.body;
  const user = await Farmer.create({
    firstName,
    lastName,
    dob,
    contactNo,
    email,
    aadhar,
    land,
    password,
    crops,
  });
  sendToken(user, 201, res);
});

// Login Farmer        => /api/v1/farmer/login
exports.loginFarmer = catchAsyncError(async (req, res, next) => {
  const { email, password, contactNo } = req.body;
  if (!password) {
    return next(new ErrorHandler("Please enter a password", 400));
  }
  let user;
  if (email || contactNo) {
    if (email) {
      // Finding user in database
      user = await Farmer.findOne({ email }).select("+password");
    } else {
      // Finding user in database
      user = await Farmer.findOne({ contactNo }).select("+password");
    }
  } else {
    return next(
      new ErrorHandler("Please enter a email or contact number", 400)
    );
  }
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  // check password is correct or not
  const isPasswordMattched = await user.comparePassword(password);
  if (!isPasswordMattched) {
    return next(new ErrorHandler("Incorrect Password", 401));
  }
  sendToken(user, 200, res);
});

