// const { JsonWebTokenError } = require("jsonwebtoken");
const ErrorHander = require("../utils/errorHander");


module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    //wrong mongodb castError
    if(err.name === "CastError"){
        const message = `Resource Not Found , Invalide : ${err.path}`;
        err = new ErrorHander(message, 400);
    } 

    //mongoose duplicate key errors
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHander(message, 400);
    }

    //json web token error
    if(err.name === "JsonWebTokenError"){
        const message = `Json Web Token Invalide , please try again`;
        err = new ErrorHander(message, 400);
    }

    //json web token expire error
    if(err.code === "TokenExpiredError"){
        const message = `json web token expired , please try again`;
        err = new ErrorHander(message, 400);
    }

    res.status(err.statusCode).json({
        success:false,
        // error: err.message,
        error: err.stack,
    })

}