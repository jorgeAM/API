const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//rutas
const courseRoutes = require('./routes/courseRoutes');

app.use(bodyParser.urlencoded({ extended: false }));

//para que retorno datos en formato JSON
app.use(bodyParser.json());
app.get('/', (req, res) => res.send('Hola Mundo!!'));

app.use('/api', courseRoutes);

module.exports = app;
