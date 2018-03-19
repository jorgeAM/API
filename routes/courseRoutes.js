const express = require('express');
const courseController = require('../controllers/courseController');
var api = express.Router();

api.get('/cursos', courseController.getCourses);
api.get('/curso/:id', courseController.getCourse);
api.post('/curso', courseController.saveCourse);
api.put('/curso/:id', courseController.updateCourse);
api.delete('/curso/:id', courseController.deleteCourse);

module.exports = api;
