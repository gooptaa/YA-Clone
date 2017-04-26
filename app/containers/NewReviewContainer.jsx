import {connect} from 'react-redux'
import {makeReview} from 'APP/app/action-creators/book.jsx'
import NewReview from 'APP/app/components/NewReview'

export default connect(
  state => ({}),
  {makeReview}
)(NewReview)
