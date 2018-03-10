const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema({
  nombre: String,
  ruta: String,
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
  },
});

module.exports = mongoose.model('Photo', photoSchema);
