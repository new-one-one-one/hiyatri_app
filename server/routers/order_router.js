const express = require("express");
const router = express.Router();

const { create_order,
        modify_order,
        verify_order,
        get_all_orders,
        assign_agent,
        agent_list,
        get_single_order,
        get_single_order_by_id,
        update_order_status,
        cancel_order,
        get_user_all_orders,
        add_additional_services,
        remove_additional_services,
        get_orders_for_agent } = require("../controllers/order_controller");

const { requireSignin,
        authMiddleware,
        agentMiddleware,
        superAdminMiddleware,
        adminMiddleware } = require("../middlewares/auth");


// User Routes
router.post("/order/create", create_order);
router.post('/order/verify', verify_order);
router.post('/order/modify', modify_order);
router.post('/order/cancel/:orderId', cancel_order);
router.patch('/order/update/:orderId/:order_status', update_order_status);
router.get('/order/get/single/:order_id', get_single_order_by_id);

//Admin Routes
router.get('/order/list',  get_all_orders);
router.get('/order/single/:booking_id',   get_single_order);
router.patch('/order/assign/agent/:order_id/:agent_id',  assign_agent)
router.get('/order/agent/list',   agent_list)
router.get('/order/all/:user', get_user_all_orders)

//Agent Routes
router.get('/agent/orders/all/:agent_id', get_orders_for_agent);
router.patch('/agent/add_additional/:order_id', add_additional_services);
router.patch('/agent/remove_additional/:order_id', remove_additional_services);

module.exports = router;
