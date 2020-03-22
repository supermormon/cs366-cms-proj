const Contact = require('../models/contact.model');
const sequenceGenerator = require('../routes/sequenceGenerator');

/**
 * GET
 * @param {Request} req 
 * @param {Response} res 
 */
function getContacts(req, res) {
  Contact
  .find()
  .populate('group')
  .then(contacts => {
    res.status(200).json(contacts)
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
function getContact(req, res) {
  if (!req.params.id) {
    res.status(400).json({error: "Request params missing"})
  }
  Contact
  .findOne({id: req.params.id}) 
  .populate('group')
  .then(contact => {
    if (!contact) {
      res.status(400).json({error: "No contact with id of " + req.params.id});
      return;
    }
    res.status(200).json(contact);
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
function createContact(req, res) {
  if (!req.body) {
    res.status(400).json({error: "Request body missing"});
    return;
  }
  var maxContactId = sequenceGenerator.nextId("contacts");
  const newContact = new Contact({
    id: maxContactId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
    group: req.body.group
  });
  if (newContact.group && newContact.group.length > 0) {
    newContact.group.map((groupContact) => {
      return groupContact = groupContact._id;
    })
  }
  newContact.save()
  .then(() => {
    getContacts(req, res);
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
function updateContact(req, res) {
  if (!req.body || !req.params.id) {
    res.status(400).json({error: "Request body missing"});
    return;
  }
  Contact
  .findOneAndUpdate(
    {id: req.params.id},
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      imageUrl: req.body.imageUrl,
      group: req.body.group
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
function deleteContact(req, res) {
  if (!req.params) {
    res.status(400).json({error: "Request parameters missing"});
    return;
  }
  Contact
  .findOneAndDelete({id: req.params.id})
  .then(() => {
    res.status(204).send();
  })
  .catch(err => {
    returnError(res, err);
  });
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact
}

/**
 * Returns a server error with status 500
 * @param {Response} res 
 * @param {Error} error 
 */
function returnError(res, error) {
  res.status(500).json({error: error});
}