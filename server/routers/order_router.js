const express = require("express");
const router = express.Router();

const { create_order,
        verify_order,
        get_all_orders,
        get_single_order } = require("../controllers/order_controller");

const { run_validation } = require("../validators");

router.post("/order/create/:booking_id", create_order);

router.get('/order/list', get_all_orders);
router.get('/order/single/:booking_id', get_single_order);
router.post('/order/verify', verify_order);

module.exports = router;
