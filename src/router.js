const {Router} = require('express')
const apiRouter = new Router()

const userRouter = require('./user/routes')

apiRouter.use(userRouter)

module.exports = apiRouter