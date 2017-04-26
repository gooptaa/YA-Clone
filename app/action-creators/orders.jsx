import { RECEIVE_ORDERS } from '../constants'
import axios from 'axios'
// maybe import browserHistory when we add a delete action?

// Regular action
export const receiveOrders = (allOrders) => ({
  type: RECEIVE_ORDERS,
  allOrders
})

// THUNK
export const loadOrders = function() {
  return function(dispatch) {
    axios.get('/api/orders')
    .then(function(res) {
      return res.data
    })
    .then(function(orders) {
      const action = receiveOrders(orders)
      dispatch(action)
    })
    .catch(function(err) {
      console.error(err)
    })
  }
}
