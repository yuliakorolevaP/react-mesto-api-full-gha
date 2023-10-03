const allowedCors = [
  'http://yuliakorolyova.students.nomoredomainsrocks.ru',
  'https://yuliakorolyova.students.nomoredomainsrocks.ru',
  'http://api.yuliakorolyova.nomoredomainsrocks.ru',
  'http://localhost:3000',
];

const cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  return next();
};

module.exports = cors;
