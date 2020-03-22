const Document = require('../models/document.model');
const sequenceGenerator = require('../routes/sequenceGenerator');

/**
 * GET
 * @param {Request} req 
 * @param {Response} res 
 */
function getDocuments(req, res) {
  Document
  .find()
  .then(documents => {
    res.status(200).json(documents)
  })
  .catch(err => {
    returnError(res, err);
  });
}

/**
 * GET
 * @param {Request} req 
 * @param {Response} res 
 */
function getDocument(req, res) {
  if (!req.params.id) {
    res.status(400).json({error: "Request params missing"});
    return;
  }
  Document
  .find({id: req.params.id})
  .then(document => {
    if (!document) {
      res.status(400).json({error: "No document with id of " + req.params.id});
    }
    res.status(200).json(document);
  })
  .catch(err => {
    returnError(res, err);
  })
}

/**
 * POST
 * @param {Request} req 
 * @param {Response} res 
 */
function createDocument(req, res) {
  if (!req.body) {
    res.status(400).json({error: "Request body missing"});
    return;
  }
  var maxDocumentId = sequenceGenerator.nextId("documents");
  console.log(Document);
  new Document({
    id: maxDocumentId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url
  })
  .save()
  .then(() => {
    getDocuments(req, res);
  })
  .catch(err => {
    returnError(res, err);
  })
}

/**
 * PUT
 * @param {Request} req 
 * @param {Response} res 
 */
function updateDocument(req, res) {
  if (!req.body || !req.params.id) {
    res.status(400).json({error: "Request body missing"});
    return;
  }
  Document
  .findOneAndUpdate(
    {id: req.params.id},
    {
      name: req.body.name,
      description: req.body.description,
      url: req.body.url
    })
  .then(() => {
    res.status(204).send();
  })
  .catch(err => {
    returnError(res, error);
  });
}

/**
 * DELETE
 * @param {Request} req 
 * @param {Response} res 
 */
function deleteDocument(req, res) {
  if (!req.params) {
    res.status(400).json({error: "Request parameters missing"});
    return;
  }
  Document
  .findOneAndDelete({id: req.params.id})
  .then(() => {
    res.status(204).send();
  })
  .catch(err => {
    returnError(res, err);
  });
}

module.exports = {
  getDocuments,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument
}

/**
 * Returns a server error with status 500
 * @param {Response} res 
 * @param {Error} error 
 */
function returnError(res, error) {
  res.status(500).json({error: error});
}