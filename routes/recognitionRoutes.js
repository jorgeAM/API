const express = require('express');
const multipart = require('connect-multiparty');
const recognitionController = require('../controllers/recognitionController');
var multipartMiddleware = multipart({
  uploadDir: './uploads/recognition',
});

var api = express.Router();

api.post('/reconocimiento', multipartMiddleware, recognitionController.recognition);

module.exports = api;
