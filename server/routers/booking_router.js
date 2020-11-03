const express = require("express");
const router = express.Router();

const { create_booking,
        get_booking_by_pnr } = require("../controllers/booking_controller");

const { requireSignin,
        authMiddleware,
        adminMiddleware } = require("../middlewares/auth");

const { create_booking_validator } = require("../validators/booking_validator");
const { run_validation } = require("../validators");


//User APIs
router.post("/booking/create",
             requireSignin,
             authMiddleware,
             create_booking_validator,
             run_validation,
             create_booking);

router.get("/booking/get/:pnr",
            get_booking_by_pnr
          );

//Admin APIs


//Agent APIs
module.exports = router;
