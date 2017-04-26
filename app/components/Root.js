import React from 'react'
import NavContainer from './Navbar'
import Footer from './Footer'
import Login from './Login'
import WhoAmI from './WhoAmI'
import {connect} from 'react-redux'

const Auth = connect(
  (state) => {
    return { user: state.auth, ...state }
  }
)(
  (props) => {
    return (
      <div id="main" className="container-fluid">
        <NavContainer user={props.user} />
        {props.children}
        <Footer />
      </div>
    )
  }
)

export default Auth
