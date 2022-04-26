module.exports = {

  async create(ctx) {
    try {
      if (!ctx.request.body.title) {
        ctx.throw(400, 'please provide the post title');
      }
      ctx.body = await ctx.db.Post.create({
        title: ctx.request.body.title,
        content: ctx.request.body.content,
        categoryId: ctx.request.body.categoryId,
        userId: ctx.state.userId,
        tagId: ctx.request.body.tagId,
      });
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async find(ctx) {
    try {
      ctx.body = await ctx.db.Post.findAll({
        UserId: ctx.state.userId,
        include: [
          {
            model: ctx.db.Comment,
          },
          {
            model: ctx.db.TagList,
          },
        ],
      });
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async findOne(ctx) {
    try {
      const posting = await ctx.db.Post.findOne({
        id: ctx.params.id,
        include: [
          {
            model: ctx.db.Comment,
          },
          {
            model: ctx.db.TagList,
          },
        ],
      });
      if (!posting) {
        ctx.throw(404, 'posting id is invalid');
      }
      ctx.body = posting;
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async destroy(ctx) {
    try {
      const results = await ctx.db.Post.destroy({
        where: {
          id: ctx.params.id,
        },
      });
      if (!results) {
        ctx.throw(404, 'posting id is invalid');
      }
      ctx.body = `posting is deleted with id ${ctx.params.id}`;
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async update(ctx) {
    try {
      const results = await ctx.db.Post.update({
        title: ctx.request.body.title,
        content: ctx.request.body.content,
        categoryId: ctx.request.body.categoryId,
      }, {
        where: {
          id: ctx.params.id,
        },
      });

      if (!results) {
        ctx.throw(404, 'posting id is invalid');
      }
      ctx.body = `posting is updated with id ${ctx.params.id}`;
    } catch (err) {
      ctx.throw(500, err);
    }
  },
};
