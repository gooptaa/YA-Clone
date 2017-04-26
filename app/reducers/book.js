import { RECEIVE_BOOK, RECEIVE_REVIEW } from '../constants'
import _ from 'lodash'

const reducer = (state={currentBook: {}}, action) => {
  let newState = _.merge({}, state)

  switch (action.type) {
  case RECEIVE_BOOK:
    newState.currentBook = action.book
    return newState
  case RECEIVE_REVIEW:
    newState.currentBook.reviews.push(action.review)
    return newState
  default:
    return state
  }
}

export default reducer
