const express = require('express');
const router  = express.Router();
const {create_comment, comment_list} = require('../controllers/comment_controller');


router.post('/comment/create', create_comment);
router.get('/comment/list', comment_list);

module.exports = router;
