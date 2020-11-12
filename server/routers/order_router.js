const express = require("express");
const router = express.Router();

const { create_order,
        verify_order,
        get_all_orders,
        get_single_order } = require("../controllers/order_controller");

const { run_validation } = require("../validators");

router.post("/order/create/:booking_id", create_order);

// Admin
router.get('/order/list', get_all_orders);
router.get('/order/single/:booking_id', get_single_order);

module.exports = router;
