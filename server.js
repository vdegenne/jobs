const Koa = require('koa')
const Router = require('koa-router')
const statics = require('koa-static')
const koaBody = require('koa-body')
const fs = require('fs')

const app = new Koa
const router = new Router

app.use(statics('public'))

router.get('/data', function (ctx) {
  let data = { offers: [], enterprises: [], jobsites: [] } // default
  if (fs.existsSync('public/data.json')) {
    data = fs.readFileSync('public/data.json')
  }
  ctx.body = data
})

router.post('/data', koaBody(), function (ctx) {
  fs.writeFileSync('public/data.json', JSON.stringify(ctx.request.body))
  ctx.body = ''
})

app.use(router.routes()).use(router.allowedMethods())


const port = 36531
app.listen(port, function () {
  console.log(`http://localhost:36531`)
})