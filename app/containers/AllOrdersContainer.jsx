import { connect } from 'react-redux'
import Orders from '../components/Orders'

function mapStateToProps(state) {
  return {
    orders: state.orders.list
  }
}

const AllOrdersContainer = connect(
  mapStateToProps
)(Orders)

export default AllOrdersContainer
