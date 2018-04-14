const fs = require('fs');

function recognition() {
  if (req.files.foto) {
    //sacar nombre del archivo subido
    let ruta = req.files.foto.path;
    let rootPath = 'uploads/recognition/';
    let array = ruta.split('/');

    //sacamos extencion del archivo subido
    let arrayAux = array[2].split('.');
    let ext = arrayAux[1];
    let newName = `prueba.${ext}`;
    let nuevaRuta = rootPath + newName;

    //cambiamos nombre a archivo fisico
    fs.rename(ruta, nuevaRuta, (err) => {
      console.log(err);
    });

    if (ext == 'png' || ext == 'jpg' || ext == 'gif' || ext == 'jpeg') {
      //ALGORITMO
      console.log('xxd');
      let base64String = imagen64.replace(/^data:([A-Za-z-+/]+);base64,/, '');
      var bitmap = new Buffer(base64String , 'base64');
      fs.writeFileSync('./img/image.png', bitmap);
      console.log('Se guardo la imagen');

      //VERIFICANDO SI EL  MODULO OPENCV ESTA CARGADO
      if (!cv.xmodules.face) {
        throw new Error('Por favor instalar OpenCV');
  		}

  		//RUTA DE ARCHIVOS

  		const basePath = '../uploads/recognition';

  		//CARPETA DE ROSTROS
  		const imgsPath = path.resolve(basePath, 'caras');

  		//NOMBRES O CLASES A MAPEAR

			var codigos=carnets.getCodigoCarnets();
			console.log(codigos);
  		const nameMappings = codigos;
			//const nameMappings = ['estuardo', 'rafael','jorge'];
  		//LEYENDO LAS IMAGENES
  		const imgFiles = fs.readdirSync(imgsPath);


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
  		result.objects.forEach((faceRect, i) => {
  			//REALIZANDO VALIDACION DEL NUMERO DE ROSTROS DETECTADOS
  		  if (result.numDetections[i] < minDetections) {
  		    return;
  		  }
  		  //OBTENIENDO LAS COORDENADAS DEL ROSTRO DETECTADO
  		  const faceImg = twoFacesImg.getRegion(faceRect).bgrToGray();
  		  //OBTENIENDO EL LABEL O NOMBRE DEL ROSTRO OBTENIDO
  		  const who = nameMappings[lbph.predict(faceImg).label];
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

module.exports = {
  recognition,
};
