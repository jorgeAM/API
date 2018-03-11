const express = require('express');
const studentController = require('../controllers/studentController');

var api = express.Router();

api.get('/estudiantes', studentController.getStudents);
api.post('/estudiante', studentController.saveStudent);
api.put('/estudiante/:id', studentController.updateStudent);
api.delete('/estudiante/:id', studentController.deleteStudent);

module.exports = api;
