const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  codigoCarnet: String,
  nombre: String,
  apellidoPaterno: String,
  apellidoMaterno: String,
  escuelaAcademica: {
    type: String,
    default: 'Informática',
  },
  facultad: {
    type: String,
    default: 'C.C F.F y M.M',
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
});

module.exports = mongoose.model('Student', studentSchema);
