const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

//rutas
const courseRoutes = require('./routes/courseRoutes');
const studentRoutes = require('./routes/studentRoutes');
const photoRoutes = require('./routes/photoRoutes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//para que retorno datos en formato JSON y acepte un tamaño limite de peticiones
app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/api', courseRoutes);
app.use('/api', studentRoutes);
app.use('/api', photoRoutes);

module.exports = app;
