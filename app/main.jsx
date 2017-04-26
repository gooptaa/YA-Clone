'use strict'
import React from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import NotFound from './components/NotFound'
import Auth from './components/Root'

import SignUpContainer from './components/SignUp'
// import Cart from './components/Cart'

import AllBooksContainer from './containers/AllBooksContainer'
import SingleBookContainer from './containers/SingleBookContainer'
import AllOrdersContainer from './containers/AllOrdersContainer'
// import CartContainer from './containers/CartContainer'
import NewReviewContainer from './containers/NewReviewContainer'

import {loadBooks} from './action-creators/books'
import {loadBook} from './action-creators/book'
import {loadCart} from './action-creators/cart'

const fetchInitialData = function(nextRouterState) {
  store.dispatch(loadBooks())
  store.dispatch(loadCart())
}

const onBookEnter = function(nextRouterState) {
  const bookId = nextRouterState.params.id
  store.dispatch(loadBook(bookId))
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Auth} onEnter={fetchInitialData}>
        <IndexRoute component={AllBooksContainer} />
        <Route path="/books" component={AllBooksContainer} />
        <Route path="/orders" component={AllOrdersContainer}/>
        <Route path="/signup" component={SignUpContainer}/>
        <Route path="/books/:id" component={SingleBookContainer} onEnter={onBookEnter} >
          <Route path="review" component={NewReviewContainer} />
        </Route>
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)
