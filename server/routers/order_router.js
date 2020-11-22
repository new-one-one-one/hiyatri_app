const express = require("express");
const router = express.Router();

const { create_order,
        verify_order,
        get_all_orders,
        assign_agent,
        agent_list,
        get_single_order } = require("../controllers/order_controller");

const { requireSignin,
        authMiddleware,
        agentMiddleware,
        superAdminMiddleware,
        adminMiddleware } = require("../middlewares/auth");


// User Routes
router.post("/order/create",   create_order);
router.post('/order/verify',   verify_order);


//Admin Routes
router.get('/order/list',  get_all_orders);
router.get('/order/single/:booking_id',   get_single_order);
router.patch('/order/assign/agent/:order_id/:agent_id',  assign_agent)
router.get('/order/agent/list',   agent_list)

module.exports = router;
