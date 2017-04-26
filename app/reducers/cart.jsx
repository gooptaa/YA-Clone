import { RECEIVE_CART, UPDATE_CART } from '../constants'

const initialCartState = {}

const reducer = (state=initialCartState, action) => {
  let newState = Object.assign({}, state)

  switch (action.type) {
  case RECEIVE_CART:
  case UPDATE_CART:
    newState = action.cart
    return newState

  default:
    return state
  }
}

export default reducer
