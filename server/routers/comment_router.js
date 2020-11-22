const express = require('express');
const router  = express.Router();
const {create_comment, comment_list} = require('../controllers/comment_controller');

const { requireSignin,
        authMiddleware,
        agentMiddleware,
        superAdminMiddleware,
        adminMiddleware } = require("../middlewares/auth");

//Admin Routes
router.post('/comment/create', create_comment);
router.get('/comment/list',   comment_list);

module.exports = router;
