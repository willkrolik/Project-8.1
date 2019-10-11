const db = require('./db');
const path = require('path');
const { Library } = db.models;
const { Op } = db.Sequelize;
var express = require('express');
const validation = ({ title, author }) => {
  return {
    title: !title || title.trim() === 0 ? 'Title is required' : false,
    author: !author || author.trim() === 0 ? 'Author is required' : false
  };
}
const bodyParser = require('body-parser');
var app = express();

let errors = [];

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))


app.set('view engine', 'pug');

app.get(['/', '/books'], function (req, res) {
  Library.findAll().then(
    x => res.render('index', {
      books: x.map(i => {
        return {
          id: i.id,
          title: i.title,
          author: i.author,
          genre: i.genre,
          year: i.year
        }
      }),
      errors: errors
    })
  )
});



// app.get('/books', function (req, res) {
//   res.render('index');
// });

app.post('/books/new', async (req, res) => {
  errors = [];
    try { 
    let response = await Library.create({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      year: req.body.year,
    });
    console.log(response);
    // response.statusCode === 200 && 
    res.redirect('/');
  }
  catch (err) {
    errors.push(err);
    res.render('new-book', {
      errors: errors
    })
  }
});

app.get('/books/new', function (req, res) {

  res.render('new-book', );
});

app.get('/books/:id', function (req, res) {
  Library.findByPk(req.params.id).then(
    x => {
      res.render('update-book', {
        book: {
          id: x.id,
          title: x.title,
          author: x.author,
          genre: x.genre,
          year: x.year,
        }
      });
    })
});

app.post('/books/:id', function (req, res) {
  res.render('update-book');
});

app.post('/books/:id/delete', function (req, res) {
  Library.findByPk(req.params.id).then(
    x => x.destroy({ force: true })

  )
  res.redirect('/');
});

// app.get('*', function(req, res){
//   res.send('what???', 404);
// });

app.use((req, res, next) => {
  const err = new Error('Page Not Found ');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.render('page-not-found');
});

app.listen(3000, function () {
  console.log('listening on port 3000!');
});



// (async () => {
//   await db.sequelize.sync({ force: true });

//   try {

//     const book1 = await Library.create({
//       title: 'It',
//       author: 'Stephen King',
//       genre: 'Horror',
//       year: 1986,
//     });
//     console.log(book1.toJSON());

//     const book2 = await Library.create({
//       title: 'American Gods',
//       author: 'Neil Gaiman',
//       genre: 'Fantasy',
//       year: 2001,
//     });
//     console.log(book2.toJSON());

//   } catch (error) {
//     if (error.name === 'SequelizeValidationError') {
//       const errors = error.errors.map(err => err.message);
//       console.error('Validation errors: ', errors);
//     } else {
//       throw error;
//     }
//   }
// })();