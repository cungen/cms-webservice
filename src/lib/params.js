/**
 * Request params validation
 * @returns {Function}
 */
module.exports = function () {
    let params = Array.prototype.slice.call(arguments, 0);
    if (params.length === 1 && (type(params[0]) === '[object Array]' || type(params[0]) === '[object Object]')) {
        params = params[0];
    } else if (params.length === 1 && typeof params[0] === 'string') {
        params = params[0].split(' ');
    } else {
        params = params[0];
    }

    return async function (ctx, next) {
        let i = 0;
        let p = null;
        let origin = params;
        let target = null;

        if (params.query && params.query.length) {
            origin = typeof params.query === 'string' ?
                params.query.split(' ') : params.query;
            target = ctx.query;
        } else if (params.body && params.body.length) {
            origin = typeof params.body === 'string' ?
                params.body.split(' ') : params.body;
            target = ctx.request.body;
        }

        while (i < origin.length) {
            p = origin[i];
            if (!target && (!ctx.query[p] || !ctx.request.body[p]) ||
                target && !target[p]) {
                return ctx.throw(400, `Require ${p}`);
            }
            i++
        }
        await next()
    }
};

function type (obj) {
    Object.prototype.toString.call(obj)
}