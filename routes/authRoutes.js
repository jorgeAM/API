const express = require('express');
const authenticatedMiddleware = require('../middlewares/authenticated.js');
const authController = require('../controllers/authController');
var api = express.Router();

api.post('/login', authenticatedMiddleware.ensureAuth, authController.login);

module.exports = api;
