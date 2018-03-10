const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  nombre: String,
  numeroCreditos: Number,
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
  ],
});

module.exports = mongoose.model('Course', courseSchema);
