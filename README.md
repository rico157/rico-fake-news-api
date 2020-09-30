**Rico Fake News API**
----
  Rico Fake News was built as final backend project during the [Remote Coding Bootcamp](https://northcoders.com/remote-coding-bootcamp) at Northcoders
  
  ---
  
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


