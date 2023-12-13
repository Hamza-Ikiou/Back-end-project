const {Router} = require('express');
const { getAllUsers, getUser, createUser, createUserForRegistration, editUser, deleteUser } = require('./controller');

const userRouter = new Router();

userRouter.route('/users')
    .get(getAllUsers)
    .post(createUser)

userRouter.route('/user/:email')
    .get(getUser)
    .put(editUser)
    .delete(deleteUser)

module.exports = userRouter