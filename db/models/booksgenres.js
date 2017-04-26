'use strict'

const {STRING} = require('sequelize')

module.exports = db => db.define('BooksGenres', {})

module.exports.associations = (BooksGenres, {Book, Genre}) => {
  BooksGenres.belongsTo(Book)
  BooksGenres.belongsTo(Genre)
}
