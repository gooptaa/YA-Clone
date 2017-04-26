import { RECEIVE_ORDERS } from '../constants'

const initialOrdersState = {
  list: []
}

const reducer = (state=initialOrdersState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
  case RECEIVE_ORDERS:
    newState.list = action.allOrders
    return newState

  default:
    return state
  }
}

export default reducer
