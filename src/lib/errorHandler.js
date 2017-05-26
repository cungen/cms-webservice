const alias = {};

const msgMap = {
    404: 'Requested url has no handler.',
    500: 'Internal Server Error'
};

module.exports = function (opts = {}) {
    return async function (ctx, next) {
        try {
            await next();
            const status = ctx.status || 404;
            if (status === 404) ctx.throw(status, ctx.message);
        } catch (err) {
            if (opts.debug) console.log(err.stack);

            // alias
            if (opts.alias && ('object' === typeof opts.alias)) {
                ctx.status = opts.alias[err.status] || err.status || 500;
            } else {
                ctx.status = alias[err.status] || err.status || 500
            }
            ctx.app.emit('error', err, ctx);

            ctx.body = {
                _error: {
                    code: ctx.status,
                    detail: err.expose ? err.message || msgMap[err.status] :
                        msgMap[err.status] || err.message || 'Unknown Error'
                }
            }
        }
    }
};