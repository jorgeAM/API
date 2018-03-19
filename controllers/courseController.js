const Course = require('../models/course');

function getCourses(req, res) {
  Course.find().exec((err, courses) => {
    if (err) {
      res.status(200).send({
        code: 200,
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
    if (err) return handleError(err);
    res.status(200).send({ course: course });
  });
}

function saveCourse(req, res) {
  let course = new Course();
  course.nombre = req.body.nombre;
  course.numeroCreditos = req.body.numeroCreditos;
  course.save((err, course) => {
    if (err) console.log(err);
    res.status(200).send({
      message: 'Se registro correctamente el curso',
      course: course,
    });
  });
}

function updateCourse(req, res) {
  let id = req.params.id;
  Course.findByIdAndUpdate(id, req.body, (err, course) => {
    if (err) console.log(err);
    res.status(200).send({
      message: 'Se actualizo correctamente el curso',
      course: course,
    });
  });
}

function deleteCourse(req, res) {
  let id = req.params.id;
  Course.findByIdAndRemove(id, (err, course) => {
    if (err) console.log(err);
    res.status(200).send({
      message: 'Se elimino correctamente el curso',
      course: course,
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
