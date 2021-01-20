const express = require("express");
const router = express.Router();

const { single_user,get_user,create_user,delete_user, getAllAgents } = require("../controllers/user_controller");

const { requireSignin,
        authMiddleware,
        agentMiddleware,
        superAdminMiddleware,
        adminMiddleware } = require("../middlewares/auth");

//Admin Routes
router.get("/user/:id",   single_user);
router.get('/users/all',   get_user);

//Super Admin Routes
router.post('/admin/addUser',   create_user);
router.post('/admin/removeUser',  delete_user);



module.exports = router;
