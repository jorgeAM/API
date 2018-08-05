const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  role: {
    type: String,
    default: 'user',
  },
});

module.exports = mongoose.model('User', userSchema);
