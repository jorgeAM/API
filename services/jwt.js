const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'estuardito';

exports.createToken = function (user) {
  const payload = {
    sub: user._id,
    username: user.username,
    role: user.role,
    iat: moment().unix(),
    exp: moment().add(30, 'days').unix(),
  };

  return jwt.encode(payload, secret);
};
