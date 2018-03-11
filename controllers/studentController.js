const Student = require('../models/student');

function getStudents(req, res) {
  Student.find().exec((err, students) => {
    if (err) return handleError(err);
    res.status(200).send({ students: students });
  });
}

function saveStudent(req, res) {
  let student = new Student();
  student.codigoCarnet = req.body.codigoCarnet;
  student.nombre = req.body.nombre;
  student.apellidoPaterno = req.body.apellidoPaterno;
  student.apellidoMaterno = req.body.apellidoMaterno;
  student.escuelaAcademica = req.body.escuelaAcademica;
  student.facultad = req.body.facultad;
  student.save((err, student) => {
    if (err) return handleError(err);
    res.status(200).send({
      message: 'Se registro correctamente al estudiante',
      student: student,
    });
  });
}

function updateStudent(req, res) {
  let id = req.params.id;
  Student.findByIdAndUpdate(id, req.body, (err, student) => {
    if (err) return handleError(err);
    res.status(200).send({
      message: 'Se actualizo correctamente al estudiante',
      student: student,
    });
  });
}

function deleteStudent(req, res) {
  let id = req.params.id;
  Student.findByIdAndRemove(id, (err, student) => {
    if (err) return handleError(err);
    res.status(200).send({
      message: 'Se elimino correctamente al estudiante',
      student: student,
    });
  });
}

module.exports = {
  getStudents,
  saveStudent,
  updateStudent,
  deleteStudent,
};
