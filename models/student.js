const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  codigoCarnet: String,
  nombre: String,
  apellidoPaterno: String,
  apellidoMaterno: String,
  escuelaAcademina: String,
  facultad: String,
  ruta: String,
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
});

module.exports = mongoose.model('Student', studentSchema);
