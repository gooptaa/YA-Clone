var express = require('express')
var Router = express.Router()

const db = require('APP/db')
const Book = db.model('books')

Router.get('/:genreId/books', (req, res, next) => {
  Book.findAll({
    where: {
      genreId: req.params.genreId
    }
  })
  .then(books => { res.send(books) })
  .catch(next)
})

module.exports = Router
