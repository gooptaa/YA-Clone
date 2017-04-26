var express = require('express')
var router = express.Router()

const db = require('APP/db')
const Author = db.model('author')

router.get('/', function(req, res, next) {
  Author.findAll()
  .then(authors => res.status(200).send(authors))
  .catch(next)
})

router.get('/:id', function(req, res, next) {
  Author.findById(req.params.id)
  .then(function(author) {
    if (!author) {
      res.status(404).end()
    } else {
      res.status(200).send(author)
    }
  })
  .catch(next)
})



module.exports = router
