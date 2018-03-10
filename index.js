const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect('mongodb://localhost/tesisDb');
const db = mongoose.connection;
db.on('error', console.log.bind(console, 'No se pudo conectar'));
db.once('open', () => {
  console.log('Se conecto correctamente a Mongo');
  app.listen(3005, () => console.log('Servidor corriendo en puerto 3005!'));
});
