'use strict'

const {STRING, TEXT, FLOAT, INTEGER} = require('sequelize')

module.exports = db => db.define('books', {
  title: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: TEXT
  },
  priceInCents: {
    type: INTEGER,
    validate: {
      notEmpty: true
    }
  },
  // authorId and publisherId will be created with associations
  // inventory reflects # available when added to database; "decrement" instance method updates with purchase
  // not sure if we should keep track of inventory here
  inventory: {
    type: INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  photoUrl: {
    type: STRING,
    validate: {
      isUrl: true
    }
  },
  isbn: {
    type: STRING,
    allowNull: false,
    unique: true
  },
  avgRating: {
    type: INTEGER,
    allowNull: true,
    defaultValue: 0
  }
}, {
  instanceMethods: {
    getAvgRating: function() {
      return this.getReviews()
        .then(reviews => {
          let total = 0
          reviews.forEach(review => {
            total += review.rating
          })
          return (reviews.length) ? total/reviews.length : 0
        })
    },
    isAvailable: function() {
      return this.inventory > 0
    },
    decrementInventory: function() {
      if (this.inventory > 0) {
        this.inventory--
        return this.save()
      } else {
        return Promise.reject(new Error('No inventory to decrement!'))
      }
    }
  },
  classMethods: {
    findByTitle: function(title) {
      return this.findOne({
        where: {
          title
        }
      })
    },
    findByISBN: function(isbn) {
      return this.findOne({
        where: {
          isbn
        }
      })
    }
  }
})

module.exports.associations = (Book, {Publisher, Review, OrderItem, Genre, Author}) => {
  Book.belongsTo(Publisher)
  Book.hasMany(OrderItem)
  Book.hasMany(Review)
  Book.belongsToMany(Genre, {through: 'BooksGenres'})
  Book.belongsToMany(Author, {through: 'AuthorsBooks'})
}
