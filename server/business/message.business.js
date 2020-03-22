const Message = require('../models/message.model');
const sequenceGenerator = require('../routes/sequenceGenerator');

/**
 * GET
 * @param {Request} req 
 * @param {Response} res 
 */
function getMessages (req, res) {
  Message
  .find()
  .populate('sender') // this needs to be fixed!!!
  .then(messages => {
    messages = messages.map(message => {
      return {
        _id: message._id,
        id: message.id,
        subject: message.subject,
        msgText: message.msgText,
        sender: message.sender.name
      }
    })
    res.status(200).json(messages)
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
function getMessage (req, res) {
  res.status(501).send();
}

/**
 * POST
 * @param {Request} req 
 * @param {Response} res 
 */
function createMessage (req, res) {
  if (!req.body) {
    res.status(400).json({error: "Request body missing"});
    return;
  }
  var maxMessageId = sequenceGenerator.nextId("messages");
  new Message({
    id: maxMessageId,
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: req.body.sender
  })
  .save()
  .then(() => {
    getMessages(req, res);
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
function updateMessage (req, res) {
  res.status(501).send();
}

/**
 * DELETE
 * @param {Request} req 
 * @param {Response} res 
 */
function deleteMessage (req, res) {
  res.status(501).send();
}

module.exports = {
  getMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage
}

/**
 * Returns a server error with status 500
 * @param {Response} res 
 * @param {Error} error 
 */
function returnError(res, error) {
  res.status(500).json({error: error});
}