function *isAuthenticated(next) {
    if(!this.state.user) this.throw('UnauthorizedError', 401);
    yield next;
}

exports.isAuthenticated = isAuthenticated;