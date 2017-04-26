var express = require('express')
var Router = express.Router()
var HttpError = require('./utils/HttpError')

const db = require('APP/db')
const Book = db.model('books')
const Author = db.model('author')
const Review = db.model('review')
const Genre = db.model('genre')
const Publisher = db.model('publisher')

Router.param('id', function(req, res, next, id) {
  // we want to add eager loading for reviews

  Book.findById(Number(id),
    { include: [
      {model: Genre},
      {model: Publisher},
      {model: Author},
      {model: Review}
    ]
    })
  .then(book => {
    if (!book) {
      // can refactor to use HttpError later
      throw HttpError(404)
    } else {
      req.book = book
      next()
      return null
    }
  })
    .catch(next)
})

// look up book by id
Router.get('/:id', (req, res) => {
  res.send(req.book)
})

// get all books
Router.get('/', (req, res, next) => {
  if (req.query) {
    next()
  } else {
    Book.findAll({ include: [{model: Review}, {model: Author}] })
    .then(books => res.send(books))
    .catch(next)
  }
})

// look up book by query string. remember to properly factor query strings
Router.get('/', function(req, res, next) {
  Book.findAll({
    where: req.query,
    include: [{model: Author}, {model: Review}]
  })
  .then((books) => {
    if (!books) {
      throw HttpError(404)
    } else {
      res.status(200).send(books)
    }
  })
  .catch(next)
})

Router.post('/', (req, res, next) => {
  // ToDo: find user, check if they are an admin
  Book.create(req.body)
    .then((book) => {
      res.status(201)
      res.send(book)
    })
    .catch(next)
})

// get one book, and get all reviews for that book
Router.get('/:id/reviews', (req, res, next) => {
  Review.findAll({
    where: {
      book_id: req.params.id
    }
  })
  .then((reviews) => {
    if (!reviews) {
      throw HttpError(404)
    } else {
      res.status(200).send(reviews)
    }
  })
  .catch(next)
})

Router.post('/:id/review', (req, res, next) => {
  console.log('hitting the review creation route')
  const newReview = req.body
  newReview.book_id = req.params.id
  newReview.user_id = req.user.id
  Review.create(newReview)
  .then(review => {
    res.send(review)
  }
)
})

Router.put('/:id', (req, res, next) => {
  // ToDo: find user, check if they are an admin
  req.book.update(req.body)
    .then((book) => {
      res.status(201).send(book)
    })
    .catch(next)
})

// We're not actually going to delete these once inventory hits 0; they just
// become unavailable. We can keep this for edge case of admin needing to remove
// permanently from DB, but otherwise we can get rid of this.
Router.delete('/:id', (req, res, next) => {
  req.book.destroy()
  .then((num) => {
    if (num) {
      res.sendStatus(204)
    } else {
      throw HttpError(404)
    }
  })
  .catch(next)
})

module.exports = Router
