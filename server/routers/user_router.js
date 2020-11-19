const express          = require('express'),
      {get_user, create_user,delete_user} = require('../controllers/user_controller') ,
      router           = express.Router();

      
router.get('/users/all', get_user);
router.post('/admin/addUser', create_user);
router.post('/admin/removeUser',delete_user)
module.exports = router;