const {Router} = require('express');
const { getAllUsers, getUser, createUser, createUserForRegistration, editUser, deleteUser } = require('./controller');
const { authenticateToken, roleAuthorization, userAuthorization } = require('../middleware/authorization');
const userRouter = new Router();

userRouter.route('/users')
    .get(authenticateToken, roleAuthorization(process.env.ROLE_ADMIN), getAllUsers)
    .post(authenticateToken, roleAuthorization(process.env.ROLE_ADMIN), createUser)

userRouter.route('/user/:email')
    .get(authenticateToken, roleAuthorization(process.env.ROLE_USER), userAuthorization, getUser)
    .put(authenticateToken, roleAuthorization(process.env.ROLE_USER), userAuthorization, editUser)
    .delete(authenticateToken, roleAuthorization(process.env.ROLE_ADMIN), deleteUser)

userRouter.route('/user/register')
    .post(createUserForRegistration)

module.exports = userRouter