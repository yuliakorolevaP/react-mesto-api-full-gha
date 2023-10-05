const { NODE_ENV, JWT_SECRET } = process.env;
// Секретный ключ для разработки и отладки приложения:
const JWT_SECRET_DEV = 'dev-secret-key';

module.exports = {
  NODE_ENV,
  JWT_SECRET,
  JWT_SECRET_DEV,
};
