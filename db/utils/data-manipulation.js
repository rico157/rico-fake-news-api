// extract any functions you are using to manipulate your data, into this file
exports.formatDates = (data) => {
  const newArr = [...data];
  return newArr.map((object) => {
    const newObj = { ...object };
    newObj.created_at = new Date(object.created_at);
    return newObj;
  });
};

exports.makeArticleRef = (articles) => {
  const ref = {};
  articles.forEach((article) => {
    ref[article.title] = article.article_id;
  });
  return ref;
};

exports.makeIdComments = (articlesRef, comments) => {
  return comments.map((obj) => {
    const comment = { ...obj };
    comment.article_id = articlesRef[comment.belongs_to];
    delete comment.belongs_to;
    comment.author = comment.created_by;
    delete comment.created_by;
    return comment;
    //ask about ^^^^
  });
};
