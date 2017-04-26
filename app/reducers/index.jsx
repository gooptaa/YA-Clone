import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  books: require('./books').default,
  book: require('./book').default,
  orders: require('./orders').default,
  cart: require('./cart').default
})

export default rootReducer
