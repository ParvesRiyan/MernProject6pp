const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const ErrorHander = require("../utils/errorHander");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async(req, res, next)=>{
    const { token } = req.cookies;

    if(!token){
        return next(new ErrorHander("please login to access to this resource", 401));
    }

    const decodeData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodeData.id);

    next();

});

exports.authorizeRoles = (...roles)=>{
    return (req, res, next)=>{
        if(!roles.includes(req.user.role)){
           return next( new ErrorHander(`Role: ${req.user.role} are not alowed in this resource`));
        }
        next()
    }
}