const {
  getMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage
} = require('../business/message.business');
const express = require('express');
const router = express.Router();

router.get('/api/messages', getMessages);

router.get('/api/messages/:id', getMessage);

router.post('/api/messages', createMessage);

router.put('/api/messages/:id', updateMessage);

router.delete('/api/messages/:id', deleteMessage);

module.exports = router;