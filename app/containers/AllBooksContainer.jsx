import { connect } from 'react-redux'
import Books from '../components/Books'
import {addToCart} from '../action-creators/cart'

function mapStateToProps(state) {
  return {
    allBooks: state.books.list,
    cart: state.cart
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: function(book) {
      dispatch(addToCart(book))
    }
  }
}

const AllBooksContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Books)

export default AllBooksContainer
