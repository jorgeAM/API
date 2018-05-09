const Student = require('../models/student');
const Photo = require('../models/photo');
const fs = require('fs');
const path = require('path');
const cv = require('opencv4nodejs');

async function getCodigoCarnets() {
  var array=[];
    var students= await Student.find().select('-_id codigoCarnet');
    students.forEach((data) => {
      array.push(data.codigoCarnet);
    });
    return array;
}

async function recognition(codes){
    //VERIFICANDO SI EL  MODULO OPENCV ESTA CARGADO
    if (!cv.xmodules.face) {
      throw new Error('Por favor instalar OpenCV');
    }
    //RUTA DE ARCHIVOS
    const basePath = './uploads';
    //CARPETA DE ROSTROS
    const imgsPath = path.resolve(basePath, 'students');
    const nameMappings = codes;
    //LEYENDO LAS IMAGENES
    const imgFiles = fs.readdirSync(imgsPath);

    //CREANDO OBJETO CLASIFICADOR, QUE NOS PERMITIRA DETECTAR LOS ROSTORS
    const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);
    //VARIABLE GETFACEIMAGE QUE BASICAMENTE IMPLEMENTA UNA FUNCION TIPO FLECHA QUE
    //PERMITE OBTENER LOS ROSTROS EN EL FRAME ENVIADO
    const getFaceImage = (grayImg) => {
      const faceRects = classifier.detectMultiScale(grayImg).objects;
      if (!faceRects.length) {
        throw new Error('No se ha podido detectar ningun rostro');
      }
      return grayImg.getRegion(faceRects[0]);
    };
    var res="";
    const trainImgs = imgFiles
    // OBTENIENDO LA RUTA ABSOLUTA DE LOS ARCHIVOS QUE FORMAN PARTE DE NUESTRA BD DE CARAS CARAS get absolute file path
    .map(file => res=path.resolve(imgsPath, file))
    // LEYENDO LAS IMAGENES
    .map(filePath =>cv.imread(filePath))
    // CONVIRTIENDO A ESCALA DE GRISES
    .map(img => img.bgrToGray())
    // DETECTANDO ROSTROS
    .map(getFaceImage)
    // SE HACE UN REDIMENCIONAMIENTO DE LAS CARAS CON LA FINALIDAD DE TENER UNA MEJOR PRESICION AL MOMENTO DEL RECONOCIMIENTO
    .map(faceImg => faceImg.resize(80, 80));
    // CREANDO EL LABEL O TEXTO QUE INDICARA EL NOMBRE DEL ROSTRO IDENTIFICADO
    const labels = imgFiles
    .map(file => nameMappings.findIndex(name => file.includes(name)));
    //CREANDO OBJETO QUE NOS PERMITIRA REALIZAR EL RECONOCIMIENTO USANDO EL ALGORITMO LBPH
    const lbph = new cv.LBPHFaceRecognizer();
    //ENTRENANDO A NUESTRO RECONOCEDOR CON LOS ROSTROS DEFINIDOS EN NUESTRA BASE DE DATOS
    lbph.train(trainImgs, labels);
    //LEYENDO IMAGEN EN DONDE SE REALIZARA EL RECONOCIMIENTO
    const twoFacesImg = cv.imread(path.resolve(basePath, 'image.png'));
    //REALIZANDO DETECCION DE ROSTROS
    const result = classifier.detectMultiScale(twoFacesImg.bgrToGray());
    //OPENCV TIENE LA FACILIDAD DE DETECTAR VARIOS ROSTROS CON MUCHA RAPIDEZ PERO MIENTRAS MAYOR SEAN MAS LENTO
    // SERA EL PROCESO POR LO QUE LIMITAMOS EL NUMERO DE ROSTROS DETECTADOS
    const minDetections = 10;
    //PROCEDEMOS A REALIZAR EL RECONOCIMIENTO Y EL DIBUJADO EN BASE AL NUMERO DE ROSTROS OBTENIDOS
    var who=[];
    result.objects.forEach((faceRect, i) => {
    //REALIZANDO VALIDACION DEL NUMERO DE ROSTROS DETECTADOS
    if (result.numDetections[i] < minDetections) {
        return;
    }
    //OBTENIENDO LAS COORDENADAS DEL ROSTRO DETECTADO
    const faceImg = twoFacesImg.getRegion(faceRect).bgrToGray();
    //OBTENIENDO EL LABEL O NOMBRE DEL ROSTRO OBTENIDO
    who = nameMappings[lbph.predict(faceImg).label];
  });
  //console.log(who);
  return who;
}

async function searchStudent(req,res){
  try{
    let imagen64 = req.body.img;
    let base64String = imagen64.replace(/^data:([A-Za-z-+/]+);base64,/, '');
    var bitmap = new Buffer(base64String , 'base64');
    fs.writeFileSync("./uploads/image.png", bitmap);
    console.log("Se guardo la imagen");
    //NOMBRES O CLASES A MAPEAR
    var codes=[];
    codes = await getCodigoCarnets();
    var who=[];
    who=await recognition(codes);
    console.log(who);
    var dataStudent=await getStudent4Code(who);
    console.log(dataStudent);
    var data = {
      dni:"123456"
    };
    res.status(200).send(dataStudent);
  }catch(ex){
    console.log(ex)
  }

}
function getStudents(req, res) {
  Student.find().exec((err, students) => {
    if (err) {
      res.status(500).send({
        code: 500,
        status: 'error',
        data: err,
      });
    }else res.status(200).send({
      code: 200,
      status: 'success',
      data: students,
    });
  });
}

function getStudent(req, res) {
  let id = req.params.id;
  Student.findById(id).populate('courses').exec((err, student) => {
    if (err) {
      res.status(500).send({
        code: 500,
        status: 'error',
        data: err,
      });
    }else res.status(200).send({
      code: 200,
      status: 'success',
      data: student,
    });
  });
}

async function getStudent4Code(who) {
  let codigo = who;
  var data = await Student.find({ codigoCarnet: codigo }).populate('courses');
  return data;
}

function saveStudent(req, res) {
  let student = new Student();
  student.codigoCarnet = req.body.codigoCarnet;
  student.nombre = req.body.nombre;
  student.apellidoPaterno = req.body.apellidoPaterno;
  student.apellidoMaterno = req.body.apellidoMaterno;
  student.save((err, student) => {
    if (err) {
      res.status(500).send({
        code: 500,
        status: 'error',
        data: err,
      });
    }else res.status(201).send({
      code: 201,
      status: 'success',
      data: student,
    });
  });
}

function updateStudent(req, res) {
  let id = req.params.id;
  Student.findByIdAndUpdate(id, req.body, (err, student) => {
    if (err) {
      res.status(501).send({
        code: 501,
        status: 'error',
        data: err,
      });
    }else res.status(201).send({
      code: 201,
      status: 'success',
      data: student,
    });
  });
}

function deleteStudent(req, res) {
  let id = req.params.id;
  Student.findByIdAndRemove(id, (err, student) => {
    if (err) {
      res.status(500).send({
        code: 500,
        status: 'error',
        data: err,
      });
    }else {
      if (!student) {
        res.status(404).send({
          code: 404,
          status: 'error',
          message: 'No se pudo eliminar estudiante',
        });
      }else {
        Photo.find({ student: student._id }).
        remove((err, photo) => {
          if (err) {
            res.status(500).send({
              code: 500,
              status: 'error',
              data: err,
            });
          }else {
            if (!photo) {
              res.status(404).send({
                code: 404,
                status: 'error',
                message: 'No se pudo eliminar fotos',
              });
            }else {
              if (photo.ruta) {
                //borramos las fotos fisicamente
                fs.unlink(photo.ruta, (err) => {
                  if (err) console.log(err);
                });
              }

              res.status(200).send({
                code: 200,
                status: 'success',
                data: student,
              });
            }
          }
        });
      }
    }
  });
}

function getStudentByCarnet(req, res) {
  let codigo = req.body.codigoCarnet;
  Student.find({ codigoCarnet: new RegExp(codigo, 'i') }).exec((err, students) => {
    if (err) {
      res.status(500).send({
        code: 500,
        status: 'error',
        data: err,
      });
    }else res.status(200).send({
      code: 200,
      status: 'success',
      data: students,
    });
  });
}

function showCoursePerStudent(req, res) {
  let id = req.params.id;
  Student.findById(id).populate('courses').select('-_id courses').exec((err, student) => {
    if (err) {
      res.status(500).send({
        code: 500,
        status: 'error',
        data: err,
      });
    }else res.status(200).send({
      code: 200,
      status: 'success',
      data: student,
    });
  });
}

module.exports = {
  getStudents,
  getStudent,
  getStudent4Code,
  getStudentByCarnet,
  saveStudent,
  updateStudent,
  deleteStudent,
  showCoursePerStudent,
  searchStudent,
};
