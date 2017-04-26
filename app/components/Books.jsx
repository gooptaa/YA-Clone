import React, { Component } from 'react'

import { Link } from 'react-router'


class Books extends React.Component {
  constructor(props) {
    super(props)
    console.log(props, 'props in books, we  need the card')
    this.addToCart = this.addToCart.bind(this)
  }
  addToCart(book) {
    this.props.addToCart(book)
  }
  render() {
    const starsForRating = (number, classNameText) => {
      const stars = []
      for (let i = 0; i < number; i++) {
        stars.push(<i key={i} className={classNameText} />)
      }
      return stars
    }
    return (
      <div className="container">
        <div className="row">
          <div className="row">
            <div className="col-md-9">
              <h3>Books</h3>
            </div>
          </div>
          <div className="item">
            <div className="row">
              {
                this.props.allBooks && this.props.allBooks.map((book, idx) => (

                <div key={book.id} className="col-sm-3">
                  <div className="col-item">
                    <div className="photo">
                      <Link to={`/books/${book.id}/review`}><img src={book.photoUrl} className="img-responsive" alt="a"/></Link>
                      </div>
                      <div className="info">
                        <div className="row">
                          <div className="price col-md-6">
                            <h5>{book.title}</h5>
                            <h5 className="price-text-color">$ {book.priceInCents / 100}</h5>
                            <h5
                              className="price-text-color">{book.authors[0] ? this.props.allBooks[idx].authors[0].firstName : 'no author listed'}</h5>

                          </div>
                          <div className="rating hidden-sm col-md-6">
                            {
                              starsForRating(book.avgRating, 'price-text-color fa fa-star')
                            }
                            {
                              starsForRating(5 - book.avgRating, 'fa fa-star')
                            }
                          </div>
                        </div>

                        <div className="separator clear-left">
                          <p className="btn-add">
                            <i className="fa fa-shopping-cart"/>
                            <a href='#' onClick={() => this.addToCart(book)} className="hidden-sm">Add to cart</a>
                          </p>
                          <p className="btn-details">
                            <i className="fa fa-list"/><Link to={`/books/${book.id}/review`} className="hidden-sm">More
                            details</Link></p>
                        </div>
                        <div className="clearfix">
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>

    )
  }
}
export default Books
