const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const chatsController = require('../../controllers/chatsController');
const auth = require('../../middleware/auth');
const { validateUserCreate } = require('../../middleware/validator');

router.route('/').post(chatsController.createChat);
router.get(':userId', auth, chatsController.userChats);
router.get('find/:firstId/:secondId', auth, chatsController.findChat);

module.exports = router;
