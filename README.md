**Rico Fake News API**
----
  Rico Fake News was built as final **backend** project during the [Remote Coding Bootcamp](https://northcoders.com/remote-coding-bootcamp) at Northcoders
  
  ---
  #### Tech-Stack
* Runtime Enviroment: [Node.js](https://nodejs.org/)
* Server: [express.js](https://expressjs.com/)
* Database: [PostgreSQL](https://www.postgresql.org/) / [Knex.js](http://knexjs.org/)

#### TDD 
* Testing Framework: [Jest](https://jestjs.io/)
* HTTP Requests: [supertest](https://www.npmjs.com/package/supertest)
---
### Requirements

* [PostgreSQL](https://www.postgresql.org/) 
* [Node.js](https://nodejs.org/)

## How to install

* Clone the repository

```
$ git clone https://github.com/rico157/rico-fake-news-api.git
```

* Install all the node packages with the command:

```
$ npm install
```

* Create/recreate the database with the command:

```
$ npm run setup-dbs
```

* Insert data to the database with the command:

```
$ npm run seed
```

* Start the server with the command:

```
$ npm start
```

* Start the server with nodemon the command:

```
$ npm run listen
```

## Scripts available

```
$ npm start ---> starts the server on PORT 9090
$ npm run listen ---> starts the server on PORT 9090 with nodemon (the server will restart automatically for every change)
$ npm test ---> run the test suite
$ npm run migrate-make my-new-table-name ---> create a new migration table
$ npm run migrate-latest ---> go to the latest migration
$ npm run migrate-rollback ---> go to the first migration

```
  
* **ENDPOINTS:**


:article_id = [integer]

:username = [string]

:comment_id = [integer]
```http
  
GET /api/topics

GET /api/users/:username

DELETE /api/articles/:article_id
PATCH /api/articles/:article_id
GET /api/articles/:article_id

POST /api/articles/:article_id/comments
GET /api/articles/:article_id/comments

GET /api/articles
POST /api/articles

PATCH /api/comments/:comment_id
DELETE /api/comments/:comment_id

GET /api

DELETE /api/articles/:article_id
POST /api/topics
POST /api/users
GET /api/users
```


