const express = require("express");
const router = express.Router();

const { single_user,get_user, create_user,delete_user } = require("../controllers/user_controller");


const { requireSignin,
        authMiddleware,
        agentMiddleware,
        superAdminMiddleware,
        adminMiddleware } = require("../middlewares/auth");

//Admin Routes
router.get("/user/:id", requireSignin, authMiddleware,adminMiddleware, single_user);
router.get('/users/all', requireSignin, authMiddleware,adminMiddleware, get_user);

//Super Admin Routes
router.post('/admin/addUser', requireSignin, authMiddleware, create_user);
router.post('/admin/removeUser', requireSignin, authMiddleware, delete_user)

module.exports = router;
