# Tripset-Web #
----
Tripset is a trip planning application that allows users to manage trips and their itineraries

Tripset-Web is built on mongodb, express, react and node. State control is predominately done through redux and react-router is used for routing.

## Get Started ##
----

1. cd into both the client and server folders and run `npm install`
2. Set up a Mongodb Atlas Database, then copy the URI/Connection String into the 'MONGODB_URI' variable in .env which is located at ./server/.env.
3. Open up a node terminal and run `require('crypto').randomBytes(64).toString('hex')` copy the key into the 'JWT_PRIVATE_KEY' property in .env
4. cd int oboth the client and server folders again then run `npm start`.
