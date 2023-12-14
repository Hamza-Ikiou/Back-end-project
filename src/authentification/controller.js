const { getUserForLogin } = require('../user/controller')
const { jwtTokens } = require("./jwt-helper")
const bcrypt = require('bcryptjs')

const login = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password

        // Check if an email and a password has been sent in the request
        if (!email || !password) return res.status(401).json({error: 'Email or password was not provided.'})

        // Check if the user exist and if the password in the database is the same that the one he sent
        const user = await getUserForLogin(email)
        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) return res.status(401).json({error: 'Password is incorrect.'})

        // Create a JWT for the user
        const paramsToken = { user_id: user.id, user_email: user.email, user_role: user.role }
        const userJwt = jwtTokens(paramsToken)
        res.cookie('refresh_token', userJwt.refreshToken, {httpOnly: true})

        // Put in the response the JWT created
        res.json(userJwt)
    } catch (error) {
        res.status(401).json({error: error.message})
    }
}

const refresh_token = async (req, res) => {}

const delete_token = async (req, res) => {}

module.exports = { login, refresh_token, delete_token }