const express = require("express");
const router = express.Router();

const { get_booking_by_id } = require("../controllers/booking_controller");


const { requireSignin,
        authMiddleware,
        agentMiddleware,
        superAdminMiddleware,
        adminMiddleware } = require("../middlewares/auth");

const { create_booking_validator } = require("../validators/booking_validator");
const { run_validation } = require("../validators");

//User Routes
router.get("/booking/single/:booking_id",  get_booking_by_id);

module.exports = router;
