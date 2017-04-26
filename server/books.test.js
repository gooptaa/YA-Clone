const request = require('supertest')
  , {expect} = require('chai')
  , db = require('APP/db')
  , app = require('./start')
const Book = db.model('books')

/* global describe it before beforeEach afterEach */

describe('/api/books', () => {
  before('Await database sync', () => db.didSync)
  afterEach('Clear the tables', () => db.truncate({ cascade: true }))

  let firstBook
  let secondBook
  beforeEach('Seed users', () => {
    const books = [
      {
        title: 'Harry Potter',
        priceInCents: 2000,
        inventory: 1,
        isbn: 12345
      },
      {
        title: 'Cooking',
        priceInCents: 10000,
        inventory: 10,
        isbn: 12346
      }
    ]
    return Book.bulkCreate(books, {returning: true})
      .then(createdBooks => {
        firstBook = createdBooks[0]
        secondBook = createdBooks[1]
      })
  })

  describe('GET', () =>
      it('retrieves all books', () =>
        request(app)
          .get(`/api/books/`)
          .expect(200)
          .then(res => expect(res.body.length).to.equal(2)
          )
      )
    )

  describe('GET /:id', () =>
      it('retrieve a book with an id', () =>
        request(app)
          .get(`/api/books/${firstBook.id}`)
          .expect(200)
          .then(res => expect(res.body.id).to.equal(firstBook.id))
      )
    )

  describe('GET /', () =>
      it('retrieve a book by query string', () =>
        request(app)
          .get(`/api/books?title=Cooking`)
          .expect(200)
          .then((res) => expect(res.body[0].title).to.equal('Cooking'))
      )
    )

  describe('POST', () =>
    it('creates a book', () =>
        request(app)
          .post('/api/books')
          .send({
            title: 'Harry Potter',
            priceInCents: 2000,
            inventory: 1,
            isbn: 12349
          })
          .expect(201)
          .then(res => expect(res.body.isbn).to.equal('12349')
          )))

  describe('PUT', () =>
    it('can change the inventory of a book', () =>
        request(app)
          .put(`/api/books/${firstBook.id}`)
          .send({
            inventory: 5,
          })
          .expect(201)
          .then(res => expect(res.body.inventory).to.equal(5)
          )))
})
