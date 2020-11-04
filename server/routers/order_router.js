const express = require("express");
const router = express.Router();

const { create_order, verify_order } = require("../controllers/order_controller");

const { run_validation } = require("../validators");

router.post("/order/create/:booking_id", create_order);

module.exports = router;
