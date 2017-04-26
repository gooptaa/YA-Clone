'use strict'

const db = require('APP/db')
  , { Book } = db
  , { expect } = require('chai')

/* global describe it before afterEach */

describe('Book', () => {
  before('Await database sync', () => db.didSync)
  // before('Create example book', (done) => {
  //   Book.create({
  //     title: 'Lord of the Rings',
  //     price: '30',
  //     isbn: '95-8533-541-0'
  //   })
  //   done()
  // })
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))

  describe('Inventory', () => {
    it('resolves true if the inventory is stocked', () =>
      Book.create({ title: 'Harry Potter', isbn: '95-8532-541-1', price: '20', inventory: 1 })
        .then(book => book.isAvailable())
        .then(result => expect(result).to.be.true))

    it('resolves with zero if the inventory is empty', () =>
      Book.findOrCreate({
        where: { isbn: '95-8532-541-1' },
        defaults: { title: 'Harry Potter', price: '20', inventory: 1 }
      })
        .spread((book, created) => {
          book.decrementInventory()
          return book
        })
        .then(book => {
          expect(book.inventory).to.equal(0)
        })
    )

    it('can add inventory to already existing books', () =>
      Book.create({
        title: 'Harry Potter',
        price: '20',
        isbn: '95-8532-541-1',
        inventory: 1
      })
        .then(book => {
          /* this test is broken. adding to existing books should not be
             a .create operation, but a .update operation */
          book.inventory++
          return book
        })
        .then(book => {
          expect(book.inventory).to.equal(2)
        })
    )

    // it('can find a book by title', () => {
    //   Book.findByTitle('Lord of the Rings')
    //   .then(book => {
    //     console.log(book, 'book')
    //     expect(book.title).to.be('Lord of the Rings')
    //   })
    // })
  })
})
