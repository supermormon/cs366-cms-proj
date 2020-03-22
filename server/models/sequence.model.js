const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sequenceSchema = new Schema({
  id: { type: String, required: true },
  maxDocumentId: { type: Number },
  maxMessageId: { type: Number },
  maxContactsId: { type: Number },
  maxContactId: { type: Number }
});

module.exports = mongoose.model('Sequence', sequenceSchema);