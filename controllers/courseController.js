const Course = require('../models/course');

function getCourses(req, res) {
  Course.find().exec((err, courses) => {
    if (err) return handleError(err);
    res.status(200).send({ courses: courses });
  });
}

module.exports = {
  getCourses,
};
