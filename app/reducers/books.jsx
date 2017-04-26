import { RECEIVE_BOOKS } from '../constants'

const initialBooksState = {
  list: []
}

const reducer = (state=initialBooksState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
  case RECEIVE_BOOKS:
    newState.list = action.allBooks
    return newState

  default:
    return state
  }
}

export default reducer
