const {
  topicData,
  articleData,
  commentData,
  userData,
} = require('../db/data/index.js');
const {
  formatDates,
  makeArticleRef,
  makeIdComments,
} = require('../db/utils/data-manipulation');

describe('formatDates', () => {
  it('should return an array', () => {
    expect(Array.isArray(formatDates(articleData))).toBe(true);
  });

  it('should retrun an array with the formatted dates with just one set of data', () => {
    const article = [
      {
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: 1542284514171,
        votes: 100,
      },
    ];
    const output = formatDates(article);
    const formattedDate = new Date(article[0].created_at);
    expect(output[0].created_at).toEqual(formattedDate);
  });

  it('should retrun an array with the formatted dates', () => {
    const output = formatDates(articleData);
    articleData.forEach((article, i) => {
      const formattedDate = new Date(article.created_at);
      expect(output[i].created_at).toEqual(formattedDate);
    });
  });

  it('should not mutate', () => {
    const testing = [
      {
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: 1542284514171,
        votes: 100,
      },
    ];

    formatDates(testing);

    const original = [
      {
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: 1542284514171,
        votes: 100,
      },
    ];
    expect(testing).toEqual(original);
  });
});

describe('makeArticleRef', () => {
  it('should return an object', () => {
    const article = [
      {
        article_id: 35,
        title: 'Stone Soup',
      },
    ];
    const output = makeArticleRef(article);
    expect(typeof output).toBe('object');
  });
  it('returns a new object with the title as the key and the id as the value when passed a single datra set', () => {
    const article = [
      {
        article_id: 35,
        title: 'Stone Soup',
      },
    ];
    const result = {
      'Stone Soup': 35,
    };
    const output = makeArticleRef(article);
    expect(output).toEqual(result);
  });
  it('returns a new object with the title as the key and the id as the value', () => {
    const article = [
      {
        article_id: 35,
        title: 'Stone Soup',
        body: 'The first day',
        votes: 0,
        topic: 'cooking',
        author: 'cooljmessy',
        created_at: '2016-12-13T20:58:40.516Z',
      },
      {
        article_id: 36,
        title: 'The vegan carnivore?',
        body: 'The chef Richad ...',
        topic: 'cooking',
        author: 'tickle122',
        created_at: '2017-04-14T09:56:23.248Z',
      },
    ];
    const result = {
      'Stone Soup': 35,
      'The vegan carnivore?': 36,
    };
    const output = makeArticleRef(article);

    expect(output).toEqual(result);
  });
  it('should not mutate the original arra and object', () => {
    const article = [
      {
        article_id: 35,
        title: 'Stone Soup',
        body: 'The first day',
        votes: 0,
        topic: 'cooking',
        author: 'cooljmessy',
        created_at: '2016-12-13T20:58:40.516Z',
      },
    ];
    makeArticleRef(article);
    const original = [
      {
        article_id: 35,
        title: 'Stone Soup',
        body: 'The first day',
        votes: 0,
        topic: 'cooking',
        author: 'cooljmessy',
        created_at: '2016-12-13T20:58:40.516Z',
      },
    ];
    expect(article).toEqual(original);
  });
});

describe('makeIdComments', () => {
  it('should return an array of comments', () => {
    const comments = [
      {
        body: 'Reiciendis enim soluta ...',
        belongs_to: 'Instagram',
        created_by: 'happyamy2016',
        votes: 17,
        created_at: '2017-03-17T22:27:49.732Z',
      },
    ];

    const articlesRef = {
      Instagram: 1,
    };
    const output = makeIdComments(articlesRef, comments);

    expect(typeof output[0]).toBe('object');
    expect(output[0].author).not.toBe(undefined);
  });
  it('should remove the belongs_to key ', () => {
    const comments = [
      {
        body: 'Reiciendis enim soluta ...',
        belongs_to: 'Instagram',
        created_by: 'happyamy2016',
        votes: 17,
        created_at: '2017-03-17T22:27:49.732Z',
      },
    ];

    const articlesRef = {
      Instagram: 1,
    };
    const output = makeIdComments(articlesRef, comments);
    expect(output[0].belongs_to).toBe(undefined);
  });
  it('should add article_id key to the object', () => {
    const comments = [
      {
        body: 'Reiciendis enim soluta ...',
        belongs_to: 'cars',
        created_by: 'happyamy2016',
        votes: 17,
        created_at: '2017-03-17T22:27:49.732Z',
      },
    ];

    const articlesRef = {
      cars: 1,
    };
    const output = makeIdComments(articlesRef, comments);
    expect(output[0].article_id).toBe(1);
  });
  it('should have the correct keys on multipul data sets', () => {
    const comments = [
      {
        body: 'Reiciendis enim soluta a sed cumque dolor quia quod sint.',
        belongs_to: 'Who are the most followed clubs and players on Instagram?',
        created_by: 'happyamy2016',
        votes: 17,
        created_at: '2017-03-17T22:27:49.732Z',
      },
      {
        body: 'Corporis magnam placeat quia ',
        belongs_to: 'A BRIEF HISTORY OF FOOD—NO BIG DEAL',
        created_by: 'weegembump',
        votes: 3,
        created_at: '2017-09-09T08:37:46.488Z',
      },
    ];
    const articlesRef = {
      'A BRIEF HISTORY OF FOOD—NO BIG DEAL': 1,
      'Who are the most followed clubs and players on Instagram?': 2,
    };
    const result = [
      {
        body: 'Reiciendis enim soluta a sed cumque dolor quia quod sint.',
        article_id: 2,
        author: 'happyamy2016',
        votes: 17,
        created_at: '2017-03-17T22:27:49.732Z',
      },
      {
        body: 'Corporis magnam placeat quia ',
        article_id: 1,
        author: 'weegembump',
        votes: 3,
        created_at: '2017-09-09T08:37:46.488Z',
      },
    ];
    const output = makeIdComments(articlesRef, comments);
    expect(output).toEqual(result);
  });
  it('should not mutate original array and object ', () => {
    const comments = [
      {
        body: 'Reiciendis enim soluta ...',
        belongs_to: 'Instagram',
        created_by: 'happyamy2016',
        votes: 17,
        created_at: '2017-03-17T22:27:49.732Z',
      },
    ];
    const articlesRef = {
      Instagram: 1,
    };
    makeIdComments(articlesRef, comments);

    const original = [
      {
        body: 'Reiciendis enim soluta ...',
        belongs_to: 'Instagram',
        created_by: 'happyamy2016',
        votes: 17,
        created_at: '2017-03-17T22:27:49.732Z',
      },
    ];
    expect(comments).toEqual(original);
  });
});
