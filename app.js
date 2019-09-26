const db = require('./db');
const path = require('path');
const { Library } = db.models;
const { Op } = db.Sequelize;
var express = require('express');
const bodyParser = require('body-parser');
var app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))


app.set('view engine', 'pug');


app.get('/', function (req, res) {
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
      })
    })
  )
  
});



app.get('/books', function (req, res) {
  res.render('index');
});

app.post('/books/new', function (req, res) {
  
  Library.create({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    year: req.body.year,
  })
 
  res.redirect('/');
});

app.get('/books/new', function (req, res) {
  
  res.render('new-book');
});

app.get('/books/:id', function (req, res) {
  Library.findByPk(req.params.id).then(
    x=> {
  res.render('update-book', {book: { 
    id: x.id,
    title: x.title,
    author: x.author,
    genre: x.genre,
    year: x.year,}});
})});

app.post('/books/:id', function (req, res) {
  res.render('update-book');
});

app.post('/books/:id/delete', function (req, res) {
  Library.findByPk(req.params.id).then(
    x => x.destroy({force: true})
    
  )
  res.redirect('/');
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