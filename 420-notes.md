## user model

add other validations to properties:  - make address mandatory. 
- consider splitting address into multiple fields. (ex: state (enum))

perhaps make 'notNull'
- isAdmin: make default a boolean
- isPublisher: make default a boolean

remove 'Thing' in user.js

consider adding roles to user model (Ex: admin, publisher)

_____________________

## order model

status defaults to 'cart'

date Ordered
- if you do any date manipulation, use moment.js
- is 'isDate' really necessary?

deliverOrder
- won't persist to database, so we need to save it back to database
- return this.save

Be careful with orders for unauthenticated users - Local storage is the way to go. OR force someone to log in.

findTotalPrice
- totalPrice will return 0 right now.
- change wording of order to orderItem

_____________________

## book model

average reviews per book may be good?

title
- perhpas add allowNull: false

price
- make into INTEGER, $99.99 would be 9999

photo
- add validator: isUrl
- use amazon for hosting static assets

isbn
- add validator for uniqueness

decrementInventory
- isn't saving
- styling of 'else block' is inconsistent
- else should return a rejected promise, to make sure we're returning same type of thing

_____________________

Book tests

we're not calling done or returning promises

make sure tests can fail 

return on line 42
(make sure to return promises)

_____________________

Routes

app should be a router

don't comment out code in master code

searches should be in separate router

squash first 'if' and last 'else', use 'req.query' instead of specifying for each

_____________________

consider restful routes, make it more clear what we're returning with each route in a nested way

/api/publishers
/api/books
/api/genres/1/books
/api/books/genre/1


