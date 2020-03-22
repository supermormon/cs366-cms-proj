const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact
} = require('../business/contact.business');
const express = require('express');
const router = express.Router();

router.get('/', getContacts);

router.get('/:id', getContact);

router.post('/', createContact);

router.put('/:id', updateContact);

router.delete('/:id', deleteContact);

module.exports = router;


