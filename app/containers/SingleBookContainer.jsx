import { connect } from 'react-redux'
import Book from '../components/Book'

function mapStateToProps(state, ownProps) {
  return {
    child: ownProps.children,
    book: state.book,
    reviews: state.book.reviews
  }
}

const SingleBookContainer = connect(
  mapStateToProps
)(Book)

export default SingleBookContainer
