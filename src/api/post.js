const
    _ = require('lodash'),
    xss = require('xss'),
    router = require('koa-router')(),
    auth = require('../auth/auth.service'),
    params = require('../lib/params'),
    Post = require('../model/post.model');

/**
 * Request a post
 */
router.get('/posts', async function (ctx, next) {
    const posts = await Post.find({}).select('author title updated excerpt');
    ctx.body = { value: posts };
});

router
    .get('/posts/:id', async function(ctx, next) {
        const post = await Post.findById(ctx.params.id);
        if (!post) {
            ctx.throw(404, 'Post not found');
        } else {
            ctx.body = { value: post };
        }
    });

/**
 * Create post
 */
router.post('/posts', auth.isAuthenticated, params({
    body: 'title content'
}), async function (ctx, next) {
    const params = ctx.request.body;
    const content = xss(params.content);
    await Post.create({
        author: _.pick(ctx.state.user, ['id', 'username']),
        title: params.title,
        excerpt: content.substr(0, 200),
        content: content
    });
    ctx.body = { value: 'success' };
});

/**
 * Remove post
 */
// router.delete('post', async function () {
// });

module.exports = router;

