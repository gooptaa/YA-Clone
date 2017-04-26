'use strict'

const {STRING, ENUM, DATE, INTEGER} = require('sequelize')

module.exports = db => db.define('order', {
  status: {
    type: ENUM('cart', 'pending', 'shipping', 'delivered'),
    defaultValue: 'cart'
  },
  totalOrderItems: {
    type: INTEGER,
    defaultValue: 0
  },
  dateOrdered: {
    type: DATE
  },
  dateReceived: DATE
}, {
  instanceMethods: {
    deliverOrder: function() {
      this.status = 'delivered'
      this.dateReceived = new Date()
      return this.save()
    },
    findTotalPrice: function() {
      let totalPrice = 0
      return this.getOrderItems({
        where: {
          orderId: this.id
        }
      })
          .then(orderItems => {
            orderItems.forEach(orderItem => { totalPrice += orderItem.priceAtPurchase * orderItem.quantity })
            return totalPrice
          })
    },
    numOfOrderItems: function() {
      return this.getOrderItems()
          .then((items) => items.length)
    }
  }
}
)

module.exports.associations = (Order, {User, OrderItem}) => {
  Order.belongsTo(User)
  Order.hasMany(OrderItem)
}
