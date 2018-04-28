const express = require('express');
const studentController = require('../controllers/studentController');

var api = express.Router();

api.get('/estudiantes', studentController.getStudents);
api.get('/estudiante/:id', studentController.getStudent);
api.get('/estudiante/:codigo', studentController.getStudent);
api.get('/estudiante/:id/cursos', studentController.showCoursePerStudent);
api.post('/estudiante', studentController.saveStudent);
api.post('/searchEstudiante', studentController.getStudentByCarnet);
api.put('/estudiante/:id', studentController.updateStudent);
api.delete('/estudiante/:id', studentController.deleteStudent);

module.exports = api;
