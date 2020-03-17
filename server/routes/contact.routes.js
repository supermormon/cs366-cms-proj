const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact
} = require('../business/contact.business');
const express = require('express');
const router = express.Router();

router.get('/api/contacts', getContacts);

router.get('/api/contacts/:id', getContact);

router.post('/api/contacts', createContact);

router.put('/api/contacts/:id', updateContact);

router.delete('/api/contacts/:id', deleteContact);

module.exports = router;


