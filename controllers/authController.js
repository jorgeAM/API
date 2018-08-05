const User = require('../models/user.js');
const jwt = require('../services/jwt.js');

function login(req, res) {
  const { username, password } = req.body;
  User.findOne({ username: username.toLowerCase() }, (err, user) => {
    if (err) res.status(500).send({ message: 'Ups, hubo un error' });
    else {
      if (!user) res.status(404).send({ message: 'usuario no existe' });
      else {
        if (user.password == password) res.status(200).send({ token: jwt.createToken(user) });
        else res.status(200).send({ message: 'Contraseña incorrecta' });
      }
    }
  });
}

module.exports = {
  login,
};
