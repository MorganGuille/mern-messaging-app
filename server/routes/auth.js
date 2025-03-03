const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/auth.js');


router.post('/signup', controller.Signup);
router.post('/login', controller.Login);

module.exports = router;