import { RECEIVE_BOOK, RECEIVE_REVIEW } from '../constants'
import axios from 'axios'
import {browserHistory} from 'react-router'

// Regular actions
export const receiveBook = (book) => ({
  type: RECEIVE_BOOK,
  book
})

export const receiveReview = (review) => ({
  type: RECEIVE_REVIEW,
  review
})

export const makeReview = (reviewObj, bookId) =>
  dispatch =>
    axios.post(`/api/books/${bookId}/review`,
      reviewObj)
      .then(function(res) {
        return res.data
      })
      .then(review => {
        const action = receiveReview(review)
        dispatch(action)
      })
      .catch(function(err) {
        console.error(err)
      })

// THUNKs
export const loadBook = function(id) {
  return function(dispatch) {
    axios.get(`/api/books/${id}`)
    .then(function(res) {
      return res.data
    })
    .then(function(book) {
      const action = receiveBook(book)
      dispatch(action)
    })
    .catch(function(err) {
      console.error(err)
    })
  }
}
