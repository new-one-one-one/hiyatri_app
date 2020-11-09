const express          = require('express'),
      {create_comment} = require('../controllers/comment_controller') ,
      router           = express.Router();

router.post('/booking/admin/addComment', create_comment);

module.exports = router;