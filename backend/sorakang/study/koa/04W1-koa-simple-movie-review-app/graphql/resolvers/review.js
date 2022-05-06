const { Review } = require('../../db/models');

module.exports = {
  Mutation: {
    async createReview(root, { author, movieId, comment }) {
      return Review.create({
        userId: author,
        movieId,
        comment,
      }).then((res) => ({
        author: res.dataValues.userId,
        comment: res.dataValues.comment,
        createdAt: res.dataValues.createdAt.toString(),
      }));
    },
  },
};
