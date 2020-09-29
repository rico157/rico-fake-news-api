const request = require('supertest');
const knex = require('../db/connection');
const app = require('../app');

beforeEach(function () {
  return knex.seed.run();
});

afterAll(() => {
  return knex.destroy();
});

describe('app', () => {
  describe('WRONG PATH && METHOD', () => {
    it('status:404 path not found', () => {
      const methods = ['get', 'put', 'patch', 'post', 'delete'];
      methods.forEach((method) => {
        return request(app)
          [method]('/apHai/topppicSsS')
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).toBe('Path not found');
          });
      });
    });
  });
  describe('/api', () => {
    describe('GET', () => {
      it('status:200 with a JSON of all the endpoints', () => {
        // ??
      });
    });
    describe('/topics', () => {
      describe('GET', () => {
        it('status:200 with a topics key', () => {
          return request(app)
            .get('/api/topics')
            .expect(200)
            .then(({ body: { topics } }) => {
              expect(topics).not.toBe(undefined);
            });
        });
        it('status:200 contains the right keys', () => {
          return request(app)
            .get('/api/topics')
            .expect(200)
            .then(({ body: { topics } }) => {
              topics.forEach((topic) => {
                expect(topic.hasOwnProperty('slug')).toBe(true);
                expect(topic.hasOwnProperty('description')).toBe(true);
              });
            });
        });
      });
      describe('POST', () => {});
      describe('INVALID METHODS', () => {
        it('status:405 method not allowed', () => {
          const methods = ['put', 'patch', 'delete'];
          methods.forEach((method) => {
            return request(app)
              [method]('/api/topics')
              .expect(405)
              .then(({ body: { msg } }) => {
                expect(msg).toBe('Method not allowed');
              });
          });
        });
      });
    });
    describe('/users/:username', () => {
      describe('GET', () => {
        it('status:200 with a user object', () => {
          return request(app)
            .get('/api/users/icellusedkars')
            .expect(200)
            .then(({ body: { user } }) => {
              expect(user).not.toBe(undefined);
            });
        });
        it('status:200 contains the right keys', () => {
          return request(app)
            .get('/api/users/icellusedkars')
            .expect(200)
            .then(({ body: { user } }) => {
              expect(user.hasOwnProperty('username')).toEqual(true);
              expect(user.hasOwnProperty('avatar_url')).toEqual(true);
              expect(user.hasOwnProperty('name')).toEqual(true);
            });
        });
        it('status:404 username not found', () => {
          return request(app)
            .get('/api/users/wrong_username')
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).toEqual('Username not found');
            });
        });
      });
      describe('INVALID METHODS', () => {
        it('status:405 method not allowed', () => {
          const methods = ['post', 'put', 'patch', 'delete'];
          methods.forEach((method) => {
            return request(app)
              [method]('/api/users/wrong_username')
              .expect(405)
              .then(({ body: { msg } }) => {
                expect(msg).toBe('Method not allowed');
              });
          });
        });
      });
    });
    describe('/articles', () => {
      describe('/', () => {
        describe('GET', () => {
          it('status:200 with an articles key', () => {
            return request(app)
              .get('/api/articles')
              .expect(200)
              .then(({ body: { articles } }) => {
                expect(articles.length).toBe(12);
                expect(articles).not.toBe(undefined);
              });
          });
          it('status:200 contains the right keys', () => {
            return request(app)
              .get('/api/articles')
              .expect(200)
              .then(({ body: { articles } }) => {
                articles.forEach((article) => {
                  expect(article.hasOwnProperty('author')).toBe(true);
                  expect(article.hasOwnProperty('title')).toBe(true);
                  expect(article.hasOwnProperty('article_id')).toBe(true);
                  expect(article.hasOwnProperty('topic')).toBe(true);
                  expect(article.hasOwnProperty('created_at')).toBe(true);
                  expect(article.hasOwnProperty('votes')).toBe(true);
                  expect(article.hasOwnProperty('comment_count')).toBe(true);
                });
              });
          });
          describe('?sort_by=...', () => {
            it('status:200 sort_by defaults to created_at', () => {
              return request(app)
                .get('/api/articles')
                .expect(200)
                .then(({ body: { articles } }) => {
                  expect(articles).toBeSortedBy('created_at', {
                    descending: true
                  });
                });
            });
            it('status:200 sort_by a column', () => {
              return request(app)
                .get('/api/articles?sort_by=author')
                .expect(200)
                .then(({ body: { articles } }) => {
                  expect(articles).toBeSortedBy('author', { descending: true });
                });
            });
            it('status:200 contains the right keys', () => {
              return request(app)
                .get('/api/articles?sort_by=author')
                .expect(200)
                .then(({ body: { articles } }) => {
                  articles.forEach((article) => {
                    expect(article.hasOwnProperty('author')).toBe(true);
                    expect(article.hasOwnProperty('title')).toBe(true);
                    expect(article.hasOwnProperty('article_id')).toBe(true);
                    expect(article.hasOwnProperty('topic')).toBe(true);
                    expect(article.hasOwnProperty('created_at')).toBe(true);
                    expect(article.hasOwnProperty('votes')).toBe(true);
                    expect(article.hasOwnProperty('comment_count')).toBe(true);
                  });
                });
            });
            it('status:400 invalid sort_by query', () => {
              return request(app)
                .get('/api/articles/?sort_by=wrong')
                .expect(400)
                .then(({ body: { msg } }) => {
                  expect(msg).toBe('Invalid sort_by option');
                });
            });
          });
          describe('?order=...', () => {
            it('status:200 order defaults to descending', () => {
              return request(app)
                .get('/api/articles')
                .expect(200)
                .then(({ body: { articles } }) => {
                  expect(articles).toBeSortedBy('created_at', {
                    descending: true
                  });
                });
            });
            it('status:200 order set to ascending', () => {
              return request(app)
                .get('/api/articles?order=asc')
                .expect(200)
                .then(({ body: { articles } }) => {
                  expect(articles).toBeSortedBy('created_at');
                });
            });
            it('status:200 invalid order set to default', () => {
              return request(app)
                .get('/api/articles?order=aaa')
                .expect(200)
                .then(({ body: { articles } }) => {
                  expect(articles).toBeSortedBy('created_at', {
                    descending: true
                  });
                });
            });
          });
          describe('?author=...', () => {
            it('status:200 only articles from author ', () => {
              return request(app)
                .get('/api/articles?author=icellusedkars')
                .expect(200)
                .then(({ body: { articles } }) => {
                  articles.forEach((article) => {
                    expect(article.author).toBe('icellusedkars');
                  });
                });
            });
            it('status:404 author not found', () => {
              return request(app)
                .get('/api/articles?author=wrong-author')
                .expect(404)
                .then(({ body: { msg } }) => {
                  expect(msg).toBe('Articles not found');
                });
            });
          });
          describe('?topic=...', () => {
            it('status:200 only articles from topic ', () => {
              return request(app)
                .get('/api/articles?topic=mitch')
                .expect(200)
                .then(({ body: { articles } }) => {
                  articles.forEach((article) => {
                    expect(article.topic).toBe('mitch');
                  });
                });
            });
            it('status:404 topic not found', () => {
              return request(app)
                .get('/api/articles?topic=wrong-topic')
                .expect(404)
                .then(({ body: { msg } }) => {
                  expect(msg).toBe('Articles not found');
                });
            });
          });
        });
        describe('POST', () => {
          it('status:200 with an articles key', () => {
            return request(app)
              .post('/api/articles')
              .send({
                title: 'new article',
                body: 'up to 2000 chars!',
                topic: 'mitch',
                author: 'icellusedkars'
              })
              .expect(201)
              .then(({ body: { article } }) => {
                expect(article).not.toBe(undefined);
              });
          });
          it('status:201 contains the right keys', () => {
            return request(app)
              .post('/api/articles')
              .send({
                title: 'new article',
                body: 'up to 2000 chars!',
                topic: 'mitch',
                author: 'icellusedkars'
              })
              .expect(201)
              .then(({ body: { article } }) => {
                expect(article.hasOwnProperty('author')).toEqual(true);
                expect(article.hasOwnProperty('body')).toEqual(true);
                expect(article.hasOwnProperty('created_at')).toEqual(true);
                expect(article.hasOwnProperty('votes')).toEqual(true);
                expect(article.hasOwnProperty('article_id')).toEqual(true);
                expect(article.hasOwnProperty('topic')).toEqual(true);
                expect(article.hasOwnProperty('title')).toEqual(true);
              });
          });
          it('status:201 with the right values', () => {
            return request(app)
              .post('/api/articles')
              .send({
                title: 'new article',
                body: 'up to 2000 chars!',
                topic: 'mitch',
                author: 'icellusedkars'
              })
              .expect(201)
              .then(({ body: { article } }) => {
                expect(article.author).toEqual('icellusedkars');
                expect(article.body).toEqual('up to 2000 chars!');
                expect(article.votes).toEqual(0);
                expect(article.article_id).toEqual(13);
                expect(article.topic).toEqual('mitch');
                expect(article.title).toEqual('new article');
              });
          });
          it('status:201 with the a new article', () => {
            return request(app)
              .post('/api/articles')
              .send({
                title: 'new article',
                body: 'up to 2000 chars!',
                topic: 'mitch',
                author: 'icellusedkars'
              })
              .expect(201)
              .then(() => {
                return request(app)
                  .get('/api/articles')
                  .then(({ body: { articles } }) => {
                    expect(articles.length).toBe(13);
                  });
              });
          });
          it('status:400 invalid body', () => {
            return request(app)
              .post('/api/articles')
              .send({
                titles: 'new article',
                face: 'up to 2000 chars!',
                category: 'mitch',
                username: 'icellusedkars'
              })
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).toBe('Invalid body');
              });
          });
          it('status:404 topic not found', () => {
            return request(app)
              .post('/api/articles')
              .send({
                title: 'new article',
                body: 'up to 2000 chars!',
                topic: 'jump',
                author: 'icellusedkars'
              })
              .expect(404)
              .then(({ body: { msg } }) => {
                expect(msg).toBe('Topic not found');
              });
          });
          it('status:404 author not found', () => {
            return request(app)
              .post('/api/articles')
              .send({
                title: 'new article',
                body: 'up to 2000 chars!',
                topic: 'mitch',
                author: 'wrong-author'
              })
              .expect(404)
              .then(({ body: { msg } }) => {
                expect(msg).toBe('Author not found');
              });
          });
        });
        describe('INVALID METHODS', () => {
          it('status:405 method not allowed', () => {
            const methods = ['put', 'patch', 'delete'];
            methods.forEach((method) => {
              return request(app)
                [method]('/api/articles')
                .expect(405)
                .then(({ body: { msg } }) => {
                  expect(msg).toBe('Method not allowed');
                });
            });
          });
        });
      });
      describe('/:article_id', () => {
        describe('GET', () => {
          it('status:200 with an article key', () => {
            return request(app)
              .get('/api/articles/1')
              .expect(200)
              .then(({ body: { article } }) => {
                expect(article).not.toBe(undefined);
              });
          });
          it('status:200 contains the right keys', () => {
            return request(app)
              .get('/api/articles/1')
              .expect(200)
              .then(({ body: { article } }) => {
                expect(article.hasOwnProperty('author')).toEqual(true);
                expect(article.hasOwnProperty('title')).toEqual(true);
                expect(article.hasOwnProperty('article_id')).toEqual(true);
                expect(article.hasOwnProperty('body')).toEqual(true);
                expect(article.hasOwnProperty('topic')).toEqual(true);
                expect(article.hasOwnProperty('created_at')).toEqual(true);
                expect(article.hasOwnProperty('votes')).toEqual(true);
                expect(article.hasOwnProperty('comment_count')).toEqual(true);
              });
          });
          it('status:400 invalid article_id', () => {
            return request(app)
              .get('/api/articles/invalidArticleId_GET')
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).toBe('Invalid article id');
              });
          });
          it('status:404 article_id not found', () => {
            return request(app)
              .get('/api/articles/9999')
              .expect(404)
              .then(({ body: { msg } }) => {
                expect(msg).toBe('Article not found');
              });
          });
        });
        describe('PATCH', () => {
          it('status:200 with an article', () => {
            return request(app)
              .patch('/api/articles/1')
              .send({ inc_votes: 1 })
              .expect(200)
              .then(({ body: { article } }) => {
                expect(article).not.toBe(undefined);
              });
          });
          it('status:200 with the correct keys', () => {
            return request(app)
              .patch('/api/articles/1')
              .send({ inc_votes: 1 })
              .expect(200)
              .then(({ body: { article } }) => {
                expect(article.hasOwnProperty('author')).toEqual(true);
                expect(article.hasOwnProperty('title')).toEqual(true);
                expect(article.hasOwnProperty('article_id')).toEqual(true);
                expect(article.hasOwnProperty('body')).toEqual(true);
                expect(article.hasOwnProperty('topic')).toEqual(true);
                expect(article.hasOwnProperty('created_at')).toEqual(true);
                expect(article.hasOwnProperty('votes')).toEqual(true);
                expect(article.hasOwnProperty('comment_count')).toEqual(true);
              });
          });
          it('status:200 with an increased votes key', () => {
            return request(app)
              .patch('/api/articles/1')
              .send({ inc_votes: 10 })
              .expect(200)
              .then(({ body: { article } }) => {
                expect(article.votes).toBe(110);
              });
          });
          it('status:200 with a decreased votes key', () => {
            return request(app)
              .patch('/api/articles/1')
              .send({ inc_votes: -10 })
              .expect(200)
              .then(({ body: { article } }) => {
                expect(article.votes).toBe(90);
              });
          });
          it('status:400 invalid article_id', () => {
            return request(app)
              .patch('/api/articles/invalidArticleId_PATCH')
              .send({ inc_votes: -10 })
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).toBe('Invalid article id');
              });
          });
          it('status:400 invalid vote', () => {
            return request(app)
              .patch('/api/articles/invalidVote')
              .send({ inc_votes: 'abcd' })
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).toBe('Invalid vote parameter');
              });
          });
          it('status:404 article_id not found', () => {
            return request(app)
              .patch('/api/articles/9999')
              .send({ inc_votes: -10 })
              .expect(404)
              .then(({ body: { msg } }) => {
                expect(msg).toBe('Article not found');
              });
          });
        });
        describe('DELETE', () => {
          it('status:204 deleted', () => {
            return request(app).delete('/api/articles/2').expect(204);
          });
          it('status:404 comment not found', () => {
            return request(app)
              .delete('/api/articles/9999')
              .expect(404)
              .then(({ body: { msg } }) => {
                expect(msg).toBe('Nothing deleted');
              });
          });
        });
        describe('INVALID METHODS', () => {
          it('status:405 method not allowed', () => {
            const methods = ['post', 'put'];
            methods.forEach((method) => {
              return request(app)
                [method]('/api/articles/1')
                .expect(405)
                .then(({ body: { msg } }) => {
                  expect(msg).toBe('Method not allowed');
                });
            });
          });
        });
      });
      describe('/:article_id/comments', () => {
        describe('GET', () => {
          it('status:200 with a comments key', () => {
            return request(app)
              .get('/api/articles/1/comments')
              .expect(200)
              .then(({ body: { comments } }) => {
                expect(comments).not.toBe(undefined);
              });
          });
          it('status:200 contains the right keys', () => {
            return request(app)
              .get('/api/articles/1/comments')
              .expect(200)
              .then(({ body: { comments } }) => {
                comments.forEach((comment) => {
                  expect(comment.hasOwnProperty('author')).toEqual(true);
                  expect(comment.hasOwnProperty('body')).toEqual(true);
                  expect(comment.hasOwnProperty('created_at')).toEqual(true);
                  expect(comment.hasOwnProperty('votes')).toEqual(true);
                  expect(comment.hasOwnProperty('comment_id')).toEqual(true);
                });
              });
          });
          it('status:400 invalid article_id', () => {
            return request(app)
              .get('/api/articles/A/comments')
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).toBe('Invalid article id');
              });
          });
          it('status:404 article_id not found', () => {
            return request(app)
              .get('/api/articles/9999/comments')
              .expect(404)
              .then(({ body: { msg } }) => {
                expect(msg).toBe('Article not found');
              });
          });
          describe('?sort_by=...', () => {
            it('status:200 sort_by defaults to created_at', () => {
              return request(app)
                .get('/api/articles/1/comments')
                .expect(200)
                .then(({ body: { comments } }) => {
                  expect(comments).toBeSortedBy('created_at', {
                    descending: true
                  });
                });
            });
            it('status:200 sort_by a column', () => {
              return request(app)
                .get('/api/articles/1/comments?sort_by=author')
                .expect(200)
                .then(({ body: { comments } }) => {
                  expect(comments).toBeSortedBy('author', { descending: true });
                });
            });
            it('status:400 invalid sort_by query', () => {
              return request(app)
                .get('/api/articles/1/comments?sort_by=wrong')
                .expect(400)
                .then(({ body: { msg } }) => {
                  expect(msg).toBe('Invalid sort_by option');
                });
            });
          });
          describe('?order=...', () => {
            it('status:200 order defaults to descending', () => {
              return request(app)
                .get('/api/articles/1/comments')
                .expect(200)
                .then(({ body: { comments } }) => {
                  expect(comments).toBeSortedBy('created_at', {
                    descending: true
                  });
                });
            });
            it('status:200 order set to ascending', () => {
              return request(app)
                .get('/api/articles/1/comments?order=asc')
                .expect(200)
                .then(({ body: { comments } }) => {
                  expect(comments).toBeSortedBy('created_at');
                });
            });
            it('status:200 invalid order set to default', () => {
              return request(app)
                .get('/api/articles/1/comments?order=aaa')
                .expect(200)
                .then(({ body: { comments } }) => {
                  expect(comments).toBeSortedBy('created_at', {
                    descending: true
                  });
                });
            });
          });
        });
        describe('POST', () => {
          it('status:201 with a comments key', () => {
            return request(app)
              .post('/api/articles/1/comments')
              .send({ username: 'butter_bridge', body: 'hey there' })
              .expect(201)
              .then(({ body: { comment } }) => {
                expect(comment).not.toBe(undefined);
              });
          });
          it('status:201 contains the right keys', () => {
            return request(app)
              .post('/api/articles/1/comments')
              .send({ username: 'butter_bridge', body: 'hey there' })
              .expect(201)
              .then(({ body: { comment } }) => {
                expect(comment.hasOwnProperty('author')).toEqual(true);
                expect(comment.hasOwnProperty('body')).toEqual(true);
                expect(comment.hasOwnProperty('created_at')).toEqual(true);
                expect(comment.hasOwnProperty('votes')).toEqual(true);
                expect(comment.hasOwnProperty('comment_id')).toEqual(true);
              });
          });
          it('status:201 with the right values', () => {
            return request(app)
              .post('/api/articles/1/comments')
              .send({ username: 'butter_bridge', body: 'hey there' })
              .expect(201)
              .then(({ body: { comment } }) => {
                expect(comment.body).toBe('hey there');
                expect(comment.author).toBe('butter_bridge');
                expect(comment.article_id).toBe(1);
                expect(comment.comment_id).toBe(19);
                expect(comment.votes).toBe(0);
              });
          });
          it('status:400 invalid article_id', () => {
            return request(app)
              .post('/api/articles/A/comments')
              .send({ username: 'butter_bridge', body: 'hey there' })
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).toBe('Invalid article id');
              });
          });
          it('status:400 invalid comment body', () => {
            return request(app)
              .post('/api/articles/1/comments')
              .send({ user: 'butter_bridge', msg: 'hey there' })
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).toBe('Invalid body');
              });
          });
          it('status:404 username not found', () => {
            return request(app)
              .post('/api/articles/1/comments')
              .send({ username: 'wrong-username', body: 'hey there' })
              .expect(404)
              .then(({ body: { msg } }) => {
                expect(msg).toBe('Username not found');
              });
          });
          it('status:404 article_id not found', () => {
            return request(app)
              .post('/api/articles/9999/comments')
              .send({ username: 'butter_bridge', body: 'hey there' })
              .expect(404)
              .then(({ body: { msg } }) => {
                expect(msg).toBe('Article not found');
              });
          });
        });
        describe('INVALID METHODS', () => {
          it('status:405 method not allowed', () => {
            const methods = ['patch', 'put', 'delete'];
            methods.forEach((method) => {
              return request(app)
                [method]('/api/articles/1/comments')
                .expect(405)
                .then(({ body: { msg } }) => {
                  expect(msg).toBe('Method not allowed');
                });
            });
          });
        });
      });
    });
    describe('/comments', () => {
      describe('/:comment_id', () => {
        describe('PATCH', () => {
          it('status:200 with a comment', () => {
            return request(app)
              .patch('/api/comments/1')
              .send({ inc_votes: 1 })
              .expect(200)
              .then(({ body: { comment } }) => {
                expect(comment).not.toBe(undefined);
              });
          });
          it('status:200 with the correct keys', () => {
            return request(app)
              .patch('/api/comments/1')
              .send({ inc_votes: 1 })
              .expect(200)
              .then(({ body: { comment } }) => {
                expect(comment.hasOwnProperty('author')).toEqual(true);
                expect(comment.hasOwnProperty('comment_id')).toEqual(true);
                expect(comment.hasOwnProperty('body')).toEqual(true);
                expect(comment.hasOwnProperty('created_at')).toEqual(true);
                expect(comment.hasOwnProperty('votes')).toEqual(true);
                expect(comment.hasOwnProperty('article_id')).toEqual(true);
              });
          });
          it('status:200 with an increased votes key', () => {
            return request(app)
              .patch('/api/comments/1')
              .send({ inc_votes: 10 })
              .expect(200)
              .then(({ body: { comment } }) => {
                expect(comment.votes).toBe(26);
              });
          });
          it('status:200 with a decreased votes key', () => {
            return request(app)
              .patch('/api/comments/1')
              .send({ inc_votes: -10 })
              .expect(200)
              .then(({ body: { comment } }) => {
                expect(comment.votes).toBe(6);
              });
          });
          it('status:400 invalid vote', () => {
            return request(app)
              .patch('/api/comments/1')
              .send({ inc_votes: 'abcd' })
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).toBe('Invalid vote parameter');
              });
          });
          it('status:404 comment_id not found', () => {
            return request(app)
              .patch('/api/comments/9999')
              .send({ inc_votes: -10 })
              .expect(404)
              .then(({ body: { msg } }) => {
                expect(msg).toBe('Comment not found');
              });
          });
        });
        describe('DELETE', () => {
          it('status:204 deleted', () => {
            return request(app).delete('/api/comments/1').expect(204);
          });
          it('status:404 comment not found', () => {
            return request(app)
              .delete('/api/comments/9999')
              .expect(404)
              .then(({ body: { msg } }) => {
                expect(msg).toBe('Nothing deleted');
              });
          });
        });
        describe('INVALID METHODS', () => {
          it('status:405 method not allowed', () => {
            const methods = ['post', 'put', 'get'];
            methods.forEach((method) => {
              return request(app)
                [method]('/api/comments/1')
                .expect(405)
                .then(({ body: { msg } }) => {
                  expect(msg).toBe('Method not allowed');
                });
            });
          });
        });
      });
    });
  });
  describe('/brew_coffee', () => {
    it('status:418 cant brew coffee', () => {
      return request(app)
        .get('/brew_coffee')
        .expect(418)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("I'm a teapot");
        });
    });
  });
});
