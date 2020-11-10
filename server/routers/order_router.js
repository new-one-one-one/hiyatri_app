const express = require("express");
const router = express.Router();

const { create_order, verify_order, get_all_orders } = require("../controllers/order_controller");

const { run_validation } = require("../validators");

router.post("/order/create/:booking_id", create_order);

// Admin
router.get('/order/all', get_all_orders);

module.exports = router;
