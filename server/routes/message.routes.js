const {
  getMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage
} = require('../business/message.business');
const express = require('express');
const router = express.Router();

router.get('/', getMessages);

router.get('/:id', getMessage);

router.post('/', createMessage);

router.put('/:id', updateMessage);

router.delete('/:id', deleteMessage);

module.exports = router;