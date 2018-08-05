var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'estuardito';

exports.ensureAuth = (req, res, next)=> {
  if (!req.headers.authorization) {
    return res.status(403).send({
      message: 'La petición no tiene la cabecera de autenticación!',
    });
  }

  let token = req.headers.authorization.replace(/['"]+/g, '');
  try {
    var payload = jwt.decode(token, secret);
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({ message: 'tu token ha EXPIRADO!' });
    }
  } catch (e) {
    return res.status(404).send({ message: 'tu token no es valido.' });
  }

  req.user = payload;
  next();
};
