const express = require('express');
const courseController = require('../controllers/courseController');
var api = express.Router();

api.get('/cursos', courseController.getCourses);

module.exports = api;
