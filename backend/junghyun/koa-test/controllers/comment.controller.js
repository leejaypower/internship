module.exports = {

  async create(ctx) {
    try {
      ctx.body = await ctx.db.Comment.create({
        content: ctx.request.body.content,
        postId: ctx.request.body.postId,
        userId: ctx.state.user,
      });
    } catch (err) {
      ctx.throw(500, err);
    }
  },

};
