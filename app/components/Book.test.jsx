import React from 'react'
import chai, { expect } from 'chai'
chai.use(require('chai-enzyme')())

import { shallow } from 'enzyme'

import Book from './Book.jsx'

/* global describe it beforeEach */
describe('<Book />', () => {
  const book ={}
  book.currentBook = {
    title: 'The Little Prince',
    author: 'Antoine de Saint-Exupéry',
    description: 'Cherished by all',
    priceInCents: 600,
    inventory: 0,
    photoUrl: 'www.amazon.com',
    isbn: '0156012197',
    avgRating: 4
  }

  let root
  beforeEach('render the root', () => {
    root = shallow(<Book book={book}/>)
  })

  it.only('shows the book title', () => {
    console.log(root, 'root')
    console.log(root.find('div[className="product-title"]'), 'finding the root')
        //   root.setState({ book })
    expect(root.find('div[className="col-md-7"]')).to.have.html('<div class="col-md-7"><div class="product-title">The Little Prince</div><div class="product-desc">no author listed</div><div class="product-rating"><i class="fa fa-star gold"></i><i class="fa fa-star gold"></i><i class="fa fa-star gold"></i><i class="fa fa-star gold"></i><i class="fa fa-star-o"></i></div><div class="product-price">$ 6</div><div class="product-stock">Out of Stock</div><div class="btn-group cart"><button type="button" class="btn btn-success disabled">Add to cart</button></div></div>')
  })

  it('shows the author', () => {
        //   root.setState({ book })
    expect(root.find('div[className="product-desc"]')).to.equal('Antoine de Saint-Exupéry')
  })

  it("has an 'Add to Cart' button", () => {
    const cartButton = root.find('button[type="button"]')
    expect(cartButton).to.have.length(1)
  })

  it('allows the user to submit a review', () => {
    const reviewExample = {
      text: 'This is an awesome book',
      rating: 4
    }
  // const reviewWrapper = shallow(<Review fullMessage={aDifferentMessage}/>);
       //  expect(reviewWrapper.find('div[className="product-info"]')).to.have('Antoine de Saint-Exupéry')
  })

    // it('shows all reviews', () => {

    // })
})
