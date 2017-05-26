async function isAuthenticated(ctx, next) {
    if(!ctx.state.user) ctx.throw(401);
    await next();
}

exports.isAuthenticated = isAuthenticated;