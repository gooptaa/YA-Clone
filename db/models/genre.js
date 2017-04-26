'use strict'

const {ENUM} = require('sequelize')

module.exports = db => db.define('genre', {
  genreType: {
    type: ENUM,
    values: ['fantasy', 'mystery', 'historical', 'sci-fi', 'romance', 'horror', 'action', 'death', 'thriller'],
  }
})

module.exports.associations = (Genre, {Book}) => {
  Genre.belongsToMany(Book, {through: 'BooksGenres'})
}

// we want each genre to be unique. when 1 genre is selected, it can't be selected again
// discuss validating 'unique' genres
