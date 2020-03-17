const {
  getDocuments,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument
} = require('../business/document.business');
const express = require('express');
const router = express.Router();

router.get('/api/documents', getDocuments);

router.get('/api/documents/:id', getDocument);

router.post('/api/documents', createDocument);

router.put('/api/documents/:id', updateDocument);

router.delete('/api/documents/:id', deleteDocument);

module.exports = router;