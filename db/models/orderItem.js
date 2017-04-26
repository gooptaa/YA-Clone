'use strict'

const { INTEGER } = require('sequelize')

module.exports = db => db.define('orderItem', {
  priceAtPurchase: {
    type: INTEGER,
    allowNull: false
  },
  quantity: {
    type: INTEGER,
    defaultValue: 1,
    allowNull: false
  }
}, {
  hooks: {
    beforeCreate: function totalOrderItems(orderItem, options) {
      return orderItem.getOrder()
        .then(order => {
          return this.findAll({
            where: {
              order_id: order.id
            }
          })
            .then(orderItems => {
              order.totalOrderItems = orderItems.reduce((acc, orderItem) => acc + orderItem.quantity, 0)
              return order.save()
            })
        })
    },
    beforeUpdate: function totalOrderItems(orderItem, options) {
      return orderItem.getOrder()
        .then(order => {
          return this.findAll({
            where: {
              order_id: order.id
            }
          })
            .then(orderItems => {
              order.totalOrderItems = orderItems.reduce((acc, orderItem) => acc + orderItem.quantity, 0)
              return order.save()
            })
        })
    }
  }
}
)
module.exports.associations = (OrderItem, {Order, Book}) => {
  OrderItem.belongsTo(Order)
  OrderItem.belongsTo(Book)
}
