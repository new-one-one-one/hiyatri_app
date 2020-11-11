const express = require("express");
const router = express.Router();

const { create_booking,
        fetch_booking,
        fetch_all_booking } = require("../controllers/booking_controller");

const { requireSignin,
        authMiddleware,
        adminMiddleware } = require("../middlewares/auth");

const { create_booking_validator } = require("../validators/booking_validator");
const { run_validation } = require("../validators");

router.post("/booking/create",  create_booking);
router.get("/booking/:pnr", fetch_booking);
router.get("/booking/admin/all", fetch_all_booking);
module.exports = router;
