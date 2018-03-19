const express = require('express');
const studentController = require('../controllers/studentController');

var api = express.Router();

api.get('/estudiantes', studentController.getStudents);
api.get('/estudiante/:id', studentController.getStudent);
api.post('/estudiante', studentController.saveStudent);
api.post('/searchEstudiante', studentController.getStudentByCarnet);
api.put('/estudiante/:id', studentController.updateStudent);
api.delete('/estudiante/:id', studentController.deleteStudent);
api.get('/matriculas', studentController.getCodigoCarnets);

module.exports = api;
