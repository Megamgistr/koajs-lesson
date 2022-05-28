const Koa = require('koa');
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser')

const app = new Koa();
const router = new Router();

app
.use(bodyparser())
.use(async (ctx, next) => {
	ctx.request.body.message += " first";
	ctx.body = ctx.request.body;
	return next();
})
.use(router.routes())
.use(router.allowedMethods());

router.post('/', async (ctx, next) => {
	ctx.request.body.message += " second";
	return next();
});


app.use(async (ctx, next) => {
	ctx.request.body.message += "  third";
	return next();
})



app.listen(3000);