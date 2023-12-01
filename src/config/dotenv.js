// variables de entorno
const dotenv = require('dotenv');

dotenv.config();

exports.settingDotEnvPort = () => {
  const port = process.env.PORT || 3000;
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost/proyectoDb';

  return { port, mongoUri };
};
