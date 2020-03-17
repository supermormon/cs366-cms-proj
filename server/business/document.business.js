const DocumentModel = require('../models/document.model');

function getDocuments(req, res) {
  DocumentModel.find()
  .then(documents => {
    res.status(200).json(documents)
  });
  // res.status(200).json({response: "implement document api!"});
}

function getDocument(req, res) {
  res.status(200).json({response: "implement document api!"});
}

function createDocument(req, res) {
  res.status(200).json({response: "implement document api!"});
}

function updateDocument(req, res) {
  res.status(200).json({response: "implement document api!"});
}

function deleteDocument(req, res) {
  res.status(200).json({response: "implement document api!"});
}

module.exports = {
  getDocuments,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument
}