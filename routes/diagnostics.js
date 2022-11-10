const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
const diagnosticsJson = require('../db/diagnostics.json');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  // TODO: Logic for sending all the content of db/diagnostics.json
  res.json(diagnosticsJson);
});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
  // TODO: Logic for appending data to the db/diagnostics.json file
  console.log('body', req.body);
  const { tip, topic, username } = req.body;

  const json = {
    time: Date.now(),
    error_id: uuidv4(),
    errors: {
      tip,
      topic,
      username,
    },
  };

  readAndAppend(json, './db/diagnostics.json');
  res.json('Diagnostics info has been added.');
});

module.exports = diagnostics;
