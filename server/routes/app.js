const express = require('express');
const bodyParser = require('body-parser');

const contactRoutes = require('./contact.routes');
const documentRoutes = require('./document.routes');
const messageRoutes = require('./message.routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods", 
    "GET, PUT, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app
  .use('/api/contacts', contactRoutes)
  .use('/api/documents', documentRoutes)
  .use('/api/messages', messageRoutes);

module.exports = app;