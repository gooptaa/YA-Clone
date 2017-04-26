import React, { Component } from 'react'

class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      address: ''
    }

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this)
    this.handleLastNameChange = this.handleLastNameChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleAddressChange = this.handleAddressChange.bind(this)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleFirstNameChange(event) {
    this.setState({firstName: event.target.value})
  }
  handleLastNameChange(event) {
    this.setState({lastName: event.target.value})
  }
  handleEmailChange(event) {
    this.setState({email: event.target.value})
  }
  handlePasswordChange(event) {
    this.setState({password: event.target.value})
  }
  handleAddressChange(event) {
    this.setState({address: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.signup(this.state)

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          First name:
          <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleFirstNameChange} />
        </label>
        <br />
        <label>
          Last name:
          <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleLastNameChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="text" name="email" value={this.state.email} onChange={this.handleEmailChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="text" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
        </label>
        <br />
        <label>
          Address:
          <input type="text" name="address" value={this.state.address} onChange={this.handleAddressChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default SignUp
