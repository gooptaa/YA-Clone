import React, { Component } from 'react'
import {browserHistory} from 'react-router'

class NewReview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      rating: 1,
    }

    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleRatingChange = this.handleRatingChange.bind(this)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleTextChange(event) {
    this.setState({text: event.target.value})
  }
  handleRatingChange(event) {
    this.setState({rating: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.makeReview(this.state, this.props.params.id)
    .then( () => {
      this.setState({
        text: '',
        rating: 1,
      })
    })
  }

  render() {
    return (
      <div className="container-fluid">
      <br />
      Submit a review!
      <br /> {"\n"}
      <form onSubmit={this.handleSubmit}>
        <label>
          Review:
          <textarea name="text" value={this.state.text} onChange={this.handleTextChange} />
        </label>
        <br />
          <label>
            Rating:
            <select>
              <option defaultValue value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
    )
  }
}

export default NewReview
