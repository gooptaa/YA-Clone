'use strict'

const {TEXT, INTEGER} = require('sequelize')

module.exports = db => db.define('review', {
  text: {
    type: TEXT
  },
  rating: {
    type: INTEGER,
    validate: {
      min: 1,
      max: 5
    },
    allowNull: false
  }
}, {
  hooks: {
    afterCreate: function(review, options) {
      review.getBook()
            .then(book => {
              this.findAll({
                where: {
                  book_id: book.id
                }
              })
                .then(reviews => {
                  const total = reviews.reduce((acc, review) => acc + review.rating, 0)
                  book.avgRating = (reviews.length) ? total / reviews.length : 0
                  book.save()
                })
            })
    }
  }
})

module.exports.associations = (Review, {User, Book}) => {
  Review.belongsTo(User)
  Review.belongsTo(Book)
}
