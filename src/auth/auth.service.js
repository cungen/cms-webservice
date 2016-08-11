const User = require('../model/user.model');

function *isAuthenticated(next) {
    console.log(this, this.passport.KoaPassport, this.user);
    if(!this.state.user) this.throw('UnauthorizedError', 401);
    yield next;
}

exports.isAuthenticated = isAuthenticated;