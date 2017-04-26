'use strict'

const {STRING} = require('sequelize')

module.exports = db => db.define('AuthorsBooks', {})

module.exports.associations = (AuthorsBooks, {Book, Author}) => {
  AuthorsBooks.belongsTo(Book)
  AuthorsBooks.belongsTo(Author)
}
