const Student = require('../models/student');
const Photo = require('../models/photo');
const fs = require('fs');

function getStudents(req, res) {
  Student.find().exec((err, students) => {
    if (err) {
      res.status(500).send({
        code: 500,
        status: 'error',
        data: err,
      });
    }else res.status(200).send({
      code: 200,
      status: 'success',
      data: students,
    });
  });
}

function getStudent(req, res) {
  let id = req.params.id;
  Student.findById(id).exec((err, student) => {
    if (err) {
      res.status(500).send({
        code: 500,
        status: 'error',
        data: err,
      });
    }else res.status(200).send({
      code: 200,
      status: 'success',
      data: student,
    });
  });
}

function saveStudent(req, res) {
  let student = new Student();
  student.codigoCarnet = req.body.codigoCarnet;
  student.nombre = req.body.nombre;
  student.apellidoPaterno = req.body.apellidoPaterno;
  student.apellidoMaterno = req.body.apellidoMaterno;
  student.save((err, student) => {
    if (err) {
      res.status(500).send({
        code: 500,
        status: 'error',
        data: err,
      });
    }else res.status(201).send({
      code: 201,
      status: 'success',
      data: student,
    });
  });
}

function updateStudent(req, res) {
  let id = req.params.id;
  Student.findByIdAndUpdate(id, req.body, (err, student) => {
    if (err) {
      res.status(501).send({
        code: 501,
        status: 'error',
        data: err,
      });
    }else res.status(201).send({
      code: 201,
      status: 'success',
      data: student,
    });
  });
}

function deleteStudent(req, res) {
  let id = req.params.id;
  Student.findByIdAndRemove(id, (err, student) => {
    if (err) {
      res.status(500).send({
        code: 500,
        status: 'error',
        data: err,
      });
    }else {
      if (!student) {
        res.status(404).send({
          code: 404,
          status: 'error',
          message: 'No se pudo eliminar estudiante',
        });
      }else {
        Photo.find({ student: student._id }).
        remove((err, photo) => {
          if (err) {
            res.status(500).send({
              code: 500,
              status: 'error',
              data: err,
            });
          }else {
            if (!photo) {
              res.status(404).send({
                code: 404,
                status: 'error',
                message: 'No se pudo eliminar fotos',
              });
            }else {
              //borramos las fotos fisicamente
              fs.unlink(photo.ruta, (err) => {
                if (err) console.log(err);
              });

              res.status(200).send({
                code: 200,
                status: 'success',
                data: student,
              });
            }
          }
        });
      }
    }
  });
}

function getCodigoCarnets(req, res) {
  Student.find().select('-_id codigoCarnet').exec((err, students) => {
    if (err) {
      res.status(500).send({
        code: 500,
        status: 'error',
        data: err,
      });
    }else res.status(200).send({
      code: 200,
      status: 'success',
      data: students,
    });
  });
}

module.exports = {
  getStudents,
  getStudent,
  saveStudent,
  updateStudent,
  deleteStudent,
  getCodigoCarnets,
};
