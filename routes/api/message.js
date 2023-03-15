const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const messagesController = require('../../controllers/messagesController');
const auth = require('../../middleware/auth');
const { validateUserCreate } = require('../../middleware/validator');

router.route('/').post(messagesController.addMessage);
router.get('/:chatId', messagesController.getMessages);

module.exports = router;
