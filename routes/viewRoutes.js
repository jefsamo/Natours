const express = require("express");
const viewsController = require("./../controllers/viewsController");
const authController = require("./../controllers/authController");
const bookingController = require("./../controllers/bookingController");

const router = express.Router();

router.get("/me", authController.protect, viewsController.getAccount);
router.get("/my-tours", authController.protect, viewsController.getMyTours);

router.use(authController.isLoggedIn);

router.get(
  "/",
  bookingController.createBookingCheckout,
  viewsController.getOverview
);
router.get("/login", viewsController.getLoginPage);
router.get("/tour/:slug", viewsController.getTour);

router.post(
  "/submit-user-data",
  authController.protect,
  viewsController.updateUserData
);

module.exports = router;
