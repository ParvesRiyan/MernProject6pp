const express = require("express");
const router = express.Router();
const { processPayment, sendStripeAoiKey } = require("../controllers/paymentControllers");
const { isAuthenticatedUser } = require("../middleware/auth");


router.route("/payment/process").post( isAuthenticatedUser, processPayment);

router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeAoiKey);

module.exports = router