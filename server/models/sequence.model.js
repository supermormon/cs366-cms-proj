const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sequenceSchema = new Schema({
  id: { type: String, required: true },
  maxDocumentId: { type: Double },
  maxMessageId: { type: Double },
  maxContactsId: { type: Double },
  maxContactId: { type: Double }
});

module.exports = mongoose.model('Sequence', sequenceSchema);