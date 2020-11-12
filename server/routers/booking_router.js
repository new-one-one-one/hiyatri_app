const express = require("express");
const router = express.Router();

const { create_booking,
        get_booking_by_id } = require("../controllers/booking_controller");


const { requireSignin,
        authMiddleware,
        adminMiddleware } = require("../middlewares/auth");

const { create_booking_validator } = require("../validators/booking_validator");
const { run_validation } = require("../validators");

router.post("/booking/create",  create_booking);
router.get("/booking/single/:booking_id",  get_booking_by_id);

module.exports = router;
