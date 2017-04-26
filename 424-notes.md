1) Cart logic
  - upon first time adding to cart, use findOrCreate
  - cart should a) have a convenient way to quickly add to it and look at what's in it (render component view) and b) have a way to load new page, edit cart, quantity, etc
  - try using onHover to give cart a display property (this is the convenient view)
2) Main.jsx
  - move auth component onto its own page
3) auth reducer
  - review to match bones architecture (separate files/folders for reducers, action-creators, constants, etc)
4) book reducer
  - return new state at end; newState may be redundant (completely overwriting)
5) books reducer
  - initialState could be array, though JM approved of current design (planning for future expansion)
  - return new state at end
  - newstate not strictly necessary
6) seed file
  - check out faker
7) server/cart route
  - put request shoudl be to /:id
  - add middleware to confirm proper authorizations (user:cart)
  - **authorization middleware needs to call next()
8) SignUp component
  - "computed property names"
  - make all these handlers etc more dry...

General:
  - alternative to console.error: toastr (for client side errors)


