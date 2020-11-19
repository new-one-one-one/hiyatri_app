const express = require("express");
const router = express.Router();

const { create_order,
        verify_order,
        get_all_orders,
        assign_agent,
        agent_list,
        get_single_order } = require("../controllers/order_controller");

const { run_validation } = require("../validators");

router.post("/order/create/:booking_id", create_order);

router.get('/order/list', get_all_orders);
router.get('/order/single/:booking_id', get_single_order);
router.post('/order/verify', verify_order);
router.patch('/order/assign/agent/:order_id/:agent_id', assign_agent)
router.get('/order/agent/list', agent_list)

module.exports = router;
