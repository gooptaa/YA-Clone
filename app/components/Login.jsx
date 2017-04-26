import React from 'react'
import {browserHistory} from 'react-router'
//TODO: style this!

export const Login = ({ login }) => (
  <div>
  <form onSubmit={evt => {
    evt.preventDefault()
    login(evt.target.username.value, evt.target.password.value)
  } }>
    <input name="username" />
    <input name="password" type="password" />
    <input type="submit" value="Login" />

  </form>
  <form className="oauthButtons" onSubmit={ evt => {
      evt.preventDefault()
      window.location.href='api/auth/login/google'
    }
    }>
    <input className="oauthButtons" type="submit" value="Login with Google"></input>

  </form>
  <form onSubmit={ evt => {
      evt.preventDefault()
      browserHistory.push('/signup')
    }
    }>
    <input type="submit" value="Sign Up"></input>
  </form>

  </div>
)

// <a href="/api/auth/login/google">Login with google</a>
// <a href="/signup">Sign up!</a>
import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
  state => ({}),
  {login},
)(Login)
