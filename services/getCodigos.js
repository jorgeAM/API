function getCodigoCarnets(req, res) {
  Student.find().select('-_id codigoCarnet').exec((err, students) => {
    if (err) {
      res.status(500).send({
        code: 500,
        status: 'error',
        data: err,
      });
    }else {
      let array = [];
      students.forEach((data) => {
        array.push(data.codigoCarnet);
      });
      return array;
    }
  });
}

module.exports = getCodigoCarnets;
