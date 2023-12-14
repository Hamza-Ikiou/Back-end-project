const {Router} = require('express')
const { login, refresh_token, delete_token} = require('./controller')
const authRouter = new Router()

authRouter.route('/login')
    .post(login)

authRouter.route('/refresh_token')
    .get(refresh_token)
    .delete(delete_token)

module.exports = authRouter