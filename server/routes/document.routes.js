const {
  getDocuments,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument
} = require('../business/document.business');
const express = require('express');
const router = express.Router();

router.get('/', getDocuments);

router.get('/:id', getDocument);

router.post('/', createDocument);

router.put('/:id', updateDocument);

router.delete('/:id', deleteDocument);

module.exports = router;