const express = require('express');
const multipart = require('connect-multiparty');
const photoController = require('../controllers/photoController');
var multipartMiddleware = multipart({
  uploadDir: './uploads/students',
});

var api = express.Router();

api.get('/fotos/:student', photoController.getPhotosFromStudent);
api.post('/foto/:student', multipartMiddleware, photoController.savePhoto);
api.delete('/foto/:id', photoController.deletePhoto);

module.exports = api;
