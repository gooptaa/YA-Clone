import {connect} from 'react-redux'
import {signup} from 'APP/app/reducers/auth'
import SignUp from 'APP/app/components/SignUp'

export default connect(
  state => ({}),
  {signup}
)(SignUp)
