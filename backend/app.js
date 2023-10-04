const express = require('express');
const cors = require('cors');
// const path = require('path');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const { errors } = require('celebrate');
// eslint-disable-next-line import/no-extraneous-dependencies

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
// app.use(express.static(path.join(__dirname, 'frontend')));

app.use(cors());
app.use(requestLogger);

app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/mestodb').then(() => {
  console.log('БД подключена');
}).catch(() => {
  console.log('Не удалось подключиться к БД');
});

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   family: 4,
// }).then(() => {
//   console.log('БД подключена');
// }).catch(() => {
//   console.log('Не удалось подключиться к БД');
// });
// // app.use(express.static(path.join(__dirname, 'frontend')));
// app.use(cors());

// app.use(requestLogger);
// app.use(express.json());
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
