'use strict'

const db = require('APP/db')
  , {Book, Thing, Author, Favorite, User, AuthorsBooks, Publisher, Genre, BooksGenres, Review, Order, OrderItem, Promise} = db
  , {mapValues} = require('lodash')

function seedEverything() {
  const seeded = {
    users: users(),
    things: things(),
    authors: authors(),
    books: books(),
    genres: genres(),
    publishers: publishers(),
  }

  seeded.favorites = favorites(seeded)
  seeded.bookAuthors = bookAuthors(seeded)
  seeded.booksGenres = booksGenres(seeded)
  seeded.reviews = reviews(seeded)
  seeded.orders = orders(seeded)
  seeded.orderItem = orderItem(seeded)

  return Promise.props(seeded)
}

const users = seed(User, {
  god: {
    email: 'god@example.com',
    firstName: 'So many names',
    lastName: 'So many lastnames',
    password: '1234',
  },
  barack: {
    firstName: 'Barack',
    lastName: 'Obama',
    email: 'barack@example.gov',
    password: '1234'
  },
})

const things = seed(Thing, {
  surfing: {name: 'surfing'},
  smiting: {name: 'smiting'},
  puppies: {name: 'puppies'},
})

const books = seed(Book, {
  Harry_Potter: {
    title: 'HP and the Philosophers Stone',
    description: 'Harry is sad but has and a magical stone',
    priceInCents: 789,
    inventory: 19,
    photoUrl: 'https://images-na.ssl-images-amazon.com/images/I/51kQGQirOFL.jpg',
    isbn: '0440918321'
  },
  The_Golden_Compass: {
    title: 'The Golden Compass',
    description: "In The Golden Compass, Philip Pullman has written a masterpiece that transcends genre. It is a children's book that will appeal to adults, a fantasy novel that will charm even the most hardened realist. Best of all, the author doesn't speak down to his audience, nor does he pull his punches; there is genuine terror in this book, and heartbreak, betrayal, and loss.",
    priceInCents: 719,
    inventory: 12,
    photoUrl: 'https://images-na.ssl-images-amazon.com/images/I/51MyEYnpSFL.jpg',
    isbn: '0440418321'
  },
  A_Wrinkle_in_Time: {
    title: 'A Wrinkle in Time',
    description: 'One of the best fantasy novels of all time; winner of the Newbury Award. It is the first in Engles series of books about the Murry and OKeefe families.',
    priceInCents: 1234,
    inventory: 5,
    photoUrl: 'https://images-na.ssl-images-amazon.com/images/I/41pG-zMla3L.jpg',
    isbn: '1250004675'
  },
  Twilight: {
    title: 'Twilight',
    description: "Isabella Swan's move to Forks, a small, perpetually rainy town in Washington, could have been the most boring move she ever made. But once she meets the mysterious and alluring Edward Cullen, Isabella's life takes a thrilling and terrifying turn. Up until now, Edward has managed to keep his vampire identity a secret in the small community he lives in, but now nobody is safe, especially Isabella, the person Edward holds most dear.",
    priceInCents: 1499,
    inventory: 14,
    photoUrl: 'https://images-na.ssl-images-amazon.com/images/I/41K99%2BcInvL.jpg',
    isbn: '0316015849'
  },
  The_Giver: {
    title: 'The Giver',
    description: 'The Giver is a 1993 American Young-adult fiction-Dystopian novel by Lois Lowry. It is set in a society which at first appears as a utopian society but then later revealed to be a dystopian one as the story progresses.',
    priceInCents: 357,
    inventory: 4,
    photoUrl: 'https://images-na.ssl-images-amazon.com/images/I/51bLnbNy15L.jpg',
    isbn: '0544336267'
  },
  Lord_of_the_Flies: {
    title: 'Lord of the Flies',
    description: 'At the dawn of the next world war, a plane crashes on an uncharted island, stranding a group of schoolboys. At first, with no adult supervision, their freedom is something to celebrate. This far from civilization they can do anything they want. Anything. But as order collapses, as strange howls echo in the night, as terror begins its reign, the hope of adventure seems as far removed from reality as the hope of being rescued.',
    priceInCents: 1377,
    inventory: 7,
    photoUrl: 'https://images-na.ssl-images-amazon.com/images/I/81UVwYPBtrL.jpg',
    isbn: '0399501487'
  },
  Animorphs: {
    title: 'Animorphs I: The Invasion',
    description: 'At the dawn of the next world war, a plane crashes on an uncharted island, stranding a group of schoolboys. At first, with no adult supervision, their freedom is something to celebrate. This far from civilization they can do anything they want. Anything. But as order collapses, as strange howls echo in the night, as terror begins its reign, the hope of adventure seems as far removed from reality as the hope of being rescued.',
    priceInCents: 499,
    inventory: 2,
    photoUrl: 'https://upload.wikimedia.org/wikipedia/en/c/c9/The_Invasion_Front_Cover.jpg',
    isbn: '0399501420'
  }
})

const publishers = seed(Publisher, {
  Scholastic: {
    name: 'Scholastic'
  },
  MacMillian: {
    name: 'MacMillian'
  },
  Penguin: {
    name: 'Penguin'
  },
})

const genres = seed(Genre, {
  fantasy: {
    genreType: 'fantasy'
  },
  mystery: {
    genreType: 'mystery'
  },
  historical: {
    genreType: 'historical'
  },
  scifi: {
    genreType: 'sci-fi'
  },
  romance: {
    genreType: 'romance'
  },
  horror: {
    genreType: 'horror'
  },
  action: {
    genreType: 'action'
  },
  death: {
    genreType: 'death'
  },
  thriller: {
    genreType: 'thriller'
  }
})

const authors = seed(Author, {
  KA_Applegate: {
    firstName: 'KA',
    lastName: 'Applegate',
    bio: 'Her real name is Katherine'
  },
  JK_Rowling: {
    firstName: 'JK',
    lastName: 'Rowling',
    bio: 'She wrote things on a napkin'
  },
  Phillip_Pullman: {
    firstName: 'Phillip',
    lastName: 'Pullman',
    bio: 'He wrote descriptions of naviagational devices made of precious metals'
  },
  Lowis_Lowry: {
    firstName: 'Lowis',
    lastName: 'Lowry',
    bio: 'She wrote sad books'
  },
  William_Golding: {
    firstName: 'William',
    lastName: 'Golding',
    bio: 'No piggy no!'
  },
  Stephanie_Meyer: {
    firstName: 'Stephanie',
    lastName: 'Meier',
    bio: 'Gave teens some unhealthy ideas about domestic violence'
  },
  Madeline_LEngle: {
    firstName: 'Madeline',
    lastName: `L'Engle`,
    bio: 'Something about witches'
  }
})

const favorites = seed(Favorite,
  // We're specifying a function here, rather than just a rows object.
  // Using a function lets us receive the previously-seeded rows (the seed
  // function does this wiring for us).
  //
  // This lets us reference previously-created rows in order to create the join
  // rows. We can reference them by the names we used above (which is why we used
  // Objects above, rather than just arrays).
  ({users, things}) => ({
    // The easiest way to seed associations seems to be to just create rows
    // in the join table.
    'obama loves surfing': {
      user_id: users.barack.id,    // users.barack is an instance of the User model
                                   // that we created in the user seed above.
                                   // The seed function wires the promises so that it'll
                                   // have been created already.
      thing_id: things.surfing.id  // Same thing for things.
    },
    'god is into smiting': {
      user_id: users.god.id,
      thing_id: things.smiting.id
    },
    'obama loves puppies': {
      user_id: users.barack.id,
      thing_id: things.puppies.id
    },
    'god loves puppies': {
      user_id: users.god.id,
      thing_id: things.puppies.id
    },
  })
)

const booksGenres = seed(BooksGenres,
  ({books, genres}) => ({
    'harry potter so fantasy': {
      book_id: books.Harry_Potter.id,
      genre_id: genres.fantasy.id
    },
    'harry potter so action': {
      book_id: books.Harry_Potter.id,
      genre_id: genres.action.id
    },
    'giver so scifi': {
      book_id: books.The_Giver.id,
      genre_id: genres.scifi.id
    },
    'golden compass so fantasy': {
      book_id: books.The_Golden_Compass.id,
      genre_id: genres.fantasy.id
    },
    'golden compass so action': {
      book_id: books.The_Golden_Compass.id,
      genre_id: genres.action.id
    },
    'flies so action': {
      book_id: books.Lord_of_the_Flies.id,
      genre_id: genres.action.id
    },
    'flies so historical': {
      book_id: books.Lord_of_the_Flies.id,
      genre_id: genres.historical.id
    },
    'flies so thriller': {
      book_id: books.Lord_of_the_Flies.id,
      genre_id: genres.thriller.id
    }
  })
)

const orders = seed(Order,
  ({users}) => ({
    obama: {
      status: 'cart',
      user_id: users.barack.id
    },
    god: {
      status: 'pending',
      user_id: users.god.id
    }
  })
)

const orderItem = seed(OrderItem,
  ({orders, books}) => ({
    obama_giver: {
      priceAtPurchase: 750,
      quantity: 2,
      book_id: books.The_Giver.id,
      order_id: orders.obama.id
    },
    obama_potter: {
      priceAtPurchase: 500,
      quantity: 1,
      book_id: books.Harry_Potter.id,
      order_id: orders.obama.id
    },
    god_animorphs: {
      priceAtPurchase: 600,
      quantity: 7,
      book_id: books.Animorphs.id,
      order_id: orders.god.id
    },
    god_compass: {
      priceAtPurchase: 899,
      quantity: 2,
      book_id: books.The_Golden_Compass.id,
      order_id: orders.god.id
    }
  })
)

const bookAuthors = seed(AuthorsBooks,
  ({authors, books}) => ({
    'Rowling wrote HP': {
      author_id: authors.JK_Rowling.id,
      book_id: books.Harry_Potter.id
    },
    'lowry wrote the giver': {
      author_id: authors.Lowis_Lowry.id,
      book_id: books.The_Giver.id
    },
    'pullman wrote the golden compass': {
      author_id: authors.Phillip_Pullman.id,
      book_id: books.The_Golden_Compass.id
    },
    'golding wrote the Lord_of_the_Flies': {
      author_id: authors.William_Golding.id,
      book_id: books.Lord_of_the_Flies.id
    },
    'stephanie wrote twilight': {
      author_id: authors.Stephanie_Meyer.id,
      book_id: books.Twilight.id
    },
    'applegate wrote the animorphs': {
      author_id: authors.KA_Applegate.id,
      book_id: books.Animorphs.id
    },
    'denise wrote the wrinke in time': {
      author_id: authors.KA_Applegate.id,
      book_id: books.A_Wrinkle_in_Time.id
    }
  })
)

const reviews = seed(Review,
  ({users, books}) => ({
    god_twilight: {
      text: 'We did not like this book. We mean, this is more or less why we decided not to make vampires. Everyone gets all soul-searchy and BDSM-y.',
      rating: 1,
      user_id: users.god.id,
      book_id: books.Twilight.id
    },
    god_giver: {
      text: 'Nice work Lois. Seriously, home run. That poor kid. Also we found the giver to be SUPER relatable.',
      rating: 5,
      user_id: users.god.id,
      book_id: books.The_Giver.id
    },
    barack_giver: {
      text: "I think anytime one reads about dystopian societies, we immediately contemplate what's broken in our own communities. Or what's about to break. Or what's about to be purposefully dismantled by a malicious successor.",
      rating: 4,
      user_id: users.barack.id,
      book_id: books.The_Giver.id
    },
    barack_animorphs: {
      text: "Many people are surprised to learn that this is my favorite book, and not the reason you're undoubtedly thinking.",
      rating: 4,
      user_id: users.barack.id,
      book_id: books.Animorphs.id
    },
    god_lord_of_flies: {
      text: 'We did not like this book. We mean, this is more or less why we decided not to make vampires. Everyone gets all soul-searchy and BDSM-y.',
      rating: 3,
      user_id: users.god.id,
      book_id: books.The_Golden_Compass.id
    },
    god_wrikle_time: {
      text: 'Nice work Lois. Seriously, home run. That poor kid. Also we found the giver to be SUPER relatable.',
      rating: 5,
      user_id: users.god.id,
      book_id: books.A_Wrinkle_in_Time.id
    },
    barack_golden_compass: {
      text: "I think anytime one reads about dystopian societies, we immediately contemplate what's broken in our own communities. Or what's about to break. Or what's about to be purposefully dismantled by a malicious successor.",
      rating: 4,
      user_id: users.barack.id,
      book_id: books.The_Golden_Compass.id
    },
    barack_Harry_Potter: {
      text: "Many people are surprised to learn that this is my favorite book, and not the reason you're undoubtedly thinking.",
      rating: 4,
      user_id: users.barack.id,
      book_id: books.Harry_Potter.id
    }
  })
)

if (module === require.main) {
  db.didSync
    .then(() => db.sync({force: true}))
    .then(seedEverything)
    .finally(() => process.exit(0))
}

class BadRow extends Error {
  constructor(key, row, error) {
    super(error)
    this.cause = error
    this.row = row
    this.key = key
  }

  toString() {
    return `[${this.key}] ${this.cause} while creating ${JSON.stringify(this.row, 0, 2)}`
  }
}

// seed(Model: Sequelize.Model, rows: Function|Object) ->
//   (others?: {...Function|Object}) -> Promise<Seeded>
//
// Takes a model and either an Object describing rows to insert,
// or a function that when called, returns rows to insert. returns
// a function that will seed the DB when called and resolve with
// a Promise of the object of all seeded rows.
//
// The function form can be used to initialize rows that reference
// other models.
function seed(Model, rows) {
  return (others={}) => {
    if (typeof rows === 'function') {
      rows = Promise.props(
        mapValues(others,
          other =>
            // Is other a function? If so, call it. Otherwise, leave it alone.
            typeof other === 'function' ? other() : other)
      ).then(rows)
    }

    return Promise.resolve(rows)
      .then(rows => Promise.props(
        Object.keys(rows)
          .map(key => {
            const row = rows[key]
            return {
              key,
              value: Promise.props(row)
                .then(row => Model.create(row)
                  .catch(error => { throw new BadRow(key, row, error) })
                )
            }
          }).reduce(
          (all, one) => Object.assign({}, all, {[one.key]: one.value}),
          {}
        )
        )
      )
      .then(seeded => {
        console.log(`Seeded ${Object.keys(seeded).length} ${Model.name} OK`)
        return seeded
      }).catch(error => {
        console.error(`Error seeding ${Model.name}: ${error} \n${error.stack}`)
      })
  }
}

module.exports = Object.assign(seed, {users, books, authors, things, favorites, genres})
