const db = require('./db');
const { Movie, Person, Library } = db.models;
const { Op } = db.Sequelize;
var express = require('express')
var app = express()
app.set('view engine', 'pug');

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.render('index');
});

app.get('/books', function (req, res) {
  res.send('<h1>Hello World!</h1>');
});

app.get('/books/new', function (req, res) {
  res.send('Hello World!');
});

app.post('/books/new', function (req, res) {
  res.send('Hello World!');
});

app.get('/books/:id', function (req, res) {
  res.send('Hello World!');
});

app.post('/books/:id', function (req, res) {
  res.send('Hello World!');
});

app.post('/books/:id/delete', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('listening on port 3000!');
});

(async () => {
  await db.sequelize.sync({ force: true });

  try {

    const book1 = await Library.create({
      title: 'It',
      author: 'Stephen King',
      genre: 'Horror',
      year: 1986,
    });
    console.log(book1.toJSON());

    const book2 = await Library.create({
      title: 'American Gods',
      author: 'Neil Gaiman',
      genre: 'Fantasy',
      year: 2001,
    });
    console.log(book2.toJSON());

  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      console.error('Validation errors: ', errors);
    } else {
      throw error;
    }
  }
})();