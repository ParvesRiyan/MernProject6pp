const express = require("express");
const { getAllProducts, getProductDetails, createProduct, updateProduct, deleteProduct, getAdminProducts } = require("../controllers/productController");
const { createProductReview, getProductReviews, deleteReview } = require("../controllers/userController");
const { isAuthenticatedUser , authorizeRoles } = require("../middleware/auth")

const router = express.Router();

router.route("/products").get(getAllProducts)

router.route("/admin/products").get(isAuthenticatedUser , authorizeRoles("admin"), getAdminProducts)

router
.route("/admin/product/new")
.post(isAuthenticatedUser , authorizeRoles("admin"), createProduct)

router
.route("/admin/product/:id")
.put(isAuthenticatedUser , authorizeRoles("admin"), updateProduct)
.delete(isAuthenticatedUser , authorizeRoles("admin"), deleteProduct)

router.route("/product/:id").get(getProductDetails)

router.route("/review").put(isAuthenticatedUser, createProductReview)

router.route('/reviews').get(getProductReviews).delete(isAuthenticatedUser, deleteReview)

module.exports = router