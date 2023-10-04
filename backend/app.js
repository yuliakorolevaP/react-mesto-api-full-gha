// const { MONGO } = process.env;
const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const path = require('path');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const { createUser, login } = require('./controllers/users');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const {
  validationCreateUser,
  validationLogin,
} = require('./middlewares/validation');
const auth = require('./middlewares/auth');

const errorHandler = require('./middlewares/errorHandler');
const NotFound = require('./errors/NotFound');

const { PORT = 3001 } = process.env;
const app = express();
app.use(express.static(path.join(__dirname, 'frontend')));
app.use(cors());
// app.use(cors({ origin: ['http://yuliakorolyova.students.nomoredomainsrocks.ru', 'https://yuliakorolyova.students.nomoredomainsrocks.ru', 'https://api.yuliakorolyova.nomoredomainsrocks.ru', 'http://api.yuliakorolyova.nomoredomainsrocks.ru', 'http://localhost:3001', 'http://localhost:3000'] }));
app.use(requestLogger);
app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://0.0.0.0:27017/mestodb').then(() => {
  console.log('БД подключена');
}).catch(() => {
  console.log('Не удалось подключиться к БД');
});
// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });
app.post('/signin', validationLogin, login);
app.post('/signup', validationCreateUser, createUser);
app.use(auth);
app.use('/', routerUsers);
app.use('/', routerCards);

app.all('*', (req, res, next) => {
  next(new NotFound('Страница не найдена'));
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
