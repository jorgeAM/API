const Photo = require('../models/photo');
const fs = require('fs');
const path = require('path');

function getPhotosFromStudent(req, res) {
  let student = req.params.student;
  Photo.find({ student: student }, (err, photos) => {
    if (err) console.log(err);
    res.status(200).send({
      photos: photos,
    });
  });
}

function savePhoto(req, res) {
  let student = req.params.student;
  let photo = new Photo();
  if (req.files.foto) {
    //sacar nombre del archivo subido
    let ruta = req.files.foto.path;
    let array = ruta.split('/');
    photo.nombre = array[2];
    photo.ruta = req.files.foto.path;
    photo.student = student;

    //sacamos extencion del archivo subido
    let arrayAux = array[2].split('.');
    let ext = arrayAux[1];
    if (ext == 'png' || ext == 'jpg' || ext == 'gif' || ext == 'jpeg') {
      photo.save((err, photo) => {
        if (err) console.log(err);
        res.status(200).send({
          message: 'Se subio correctamente la foto',
          photo: photo,
        });
      });
    }else {
      res.status(200).send({ message: 'Solo puedes subir imágenes' });

      //eliminamos archivo que se sube de todas formas
      fs.unlink(ruta, err => {
        if (err) console.log(err);
      });
    }
  }else {
    res.status(200).send({ message: 'Debes subir una imagen' });
  }
}

function deletePhoto(req, res) {
  let id = req.params.id;
  Photo.findByIdAndRemove(id, (err, photo) => {
    if (err) console.log(err);

    //elimimos archivo de la carpeta donde esta almacenado
    fs.unlink(photo.ruta, (err) => {
      if (err) console.log(err);
    });
    res.status(200).send({
      message: 'Se elimino correctamente la foto',
      photo: photo,
    });
  });
}

module.exports = {
  getPhotosFromStudent,
  savePhoto,
  deletePhoto,
};
