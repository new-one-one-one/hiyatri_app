const express = require("express");
const router = express.Router();

const { create_booking,
        get_booking_by_id } = require("../controllers/booking_controller");


const { requireSignin,
        authMiddleware,
        agentMiddleware,
        superAdminMiddleware,
        adminMiddleware } = require("../middlewares/auth");

const { create_booking_validator } = require("../validators/booking_validator");
const { run_validation } = require("../validators");

//User Routes
router.post("/booking/create", requireSignin, authMiddleware, create_booking);
router.get("/booking/single/:booking_id", requireSignin, authMiddleware, get_booking_by_id);

module.exports = router;
