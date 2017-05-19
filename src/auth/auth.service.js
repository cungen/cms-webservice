const User = require('../model/user.model');

async function isAuthenticated(ctx, next) {
    if(!ctx.state.user) ctx.throw('UnauthorizedError', 401);
    next();
}

exports.isAuthenticated = isAuthenticated;