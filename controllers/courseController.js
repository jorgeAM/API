const Course = require('../models/course');

function getCourses(req, res) {
  Course.find().exec((err, courses) => {
    if (err) {
      res.status(500).send({
        code: 500,
        status: 'error',
        data: err,
      });
    }else res.status(200).send({
      code: 200,
      status: 'success',
      data: courses,
    });
  });
}

function getCourse(req, res) {
  let id = req.params.id;
  Course.findById(id).exec((err, course) => {
    if (err) {
      res.status(500).send({
        code: 500,
        status: 'error',
        data: err,
      });
    }else res.status(200).send({
      code: 200,
      status: 'success',
      data: course,
    });
  });
}

function saveCourse(req, res) {
  let course = new Course();
  course.nombre = req.body.nombre;
  course.numeroCreditos = req.body.numeroCreditos;
  course.save((err, course) => {
    if (err) {
      res.status(500).send({
        code: 500,
        status: 'error',
        data: err,
      });
    }else res.status(200).send({
      code: 200,
      status: 'success',
      data: course,
    });
  });
}

function updateCourse(req, res) {
  let id = req.params.id;
  Course.findByIdAndUpdate(id, req.body, (err, course) => {
    if (err) {
      res.status(500).send({
        code: 500,
        status: 'error',
        data: err,
      });
    }else res.status(200).send({
      code: 200,
      status: 'success',
      data: course,
    });
  });
}

function deleteCourse(req, res) {
  let id = req.params.id;
  Course.findByIdAndRemove(id, (err, course) => {
    if (err) {
      res.status(500).send({
        code: 500,
        status: 'error',
        data: err,
      });
    }else res.status(200).send({
      code: 200,
      status: 'success',
      data: course,
    });
  });
}

module.exports = {
  getCourses,
  getCourse,
  saveCourse,
  updateCourse,
  deleteCourse,
};
