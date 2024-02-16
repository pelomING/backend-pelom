const swaggerAutogen = require('swagger-autogen')();


const ruta_host = "localhost:8080";
const schema = ['http'];
const doc = {
    info: {
      title: 'API Obras',
      description: 'API de Obras',
      contact: {
        name: 'Tecnología y Negocios Pelom',
        url: 'https://www.pelom.cl',
        email: 'ti.pelom@pelom.cl',
      },
    },
    host: `${ruta_host}`,
    schemes: schema,
  };

  const outputFile = './swagger-output.json';
  const endpointsFiles = ['./src/routes/index.ts'];

  swaggerAutogen(outputFile, endpointsFiles, doc).then(() => { require('./server') });