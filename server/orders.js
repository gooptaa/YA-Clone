var express = require('express')
var router = express.Router()

const db = require('APP/db')
const Order = db.model('order')
const OrderItem = db.model('orderItem')
const Book = db.model('books')

router.get('/', (req, res, next) => {
  if (req.user) {
    Order.findAll({
      where: {
        user_id: req.session.passport.user
      },
      include: [{model: OrderItem, include: [{model: Book}]}]
    })
    .then(orders => res.status(201).json(orders))
    .catch(next)
  } else {
    console.log("That functionality is not running yet... please log in.")
    res.json({you_need_to: "log in"})
  }
})

module.exports = router
