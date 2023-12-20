const { getUserForLogin } = require('../user/controller')
const { jwtTokens } = require("./jwt-helper")
const { verify } = require("jsonwebtoken")
const prisma = require("../prisma")
const { isValidEmail, comparePassword, hashPassword } = require('../user/utils')

const login = async (req, res) => {
    try {
        const {email, password} = req.body

        if (!email || !password) return res.status(401).json({error: 'Email or password was not provided.'})
        if(!isValidEmail(email)) throw new Error('Invalid Email.')

        const user = await getUserForLogin(email)
        if(!(await comparePassword(password, user.password))) throw new Error('Password is incorrect.')

        const paramsToken = { user_id: user.id, user_email: user.email, user_role: user.role }
        const userJwt = jwtTokens(paramsToken)
        res.cookie('refresh_token', userJwt.refreshToken, {httpOnly: true})

        res.json(userJwt)
    } catch (error) {
        res.status(401).json({error: error.message})
    }
}

const googleAuth = async (req, accessToken, refreshToken, profile, done) => {
    let user = await getUserForLogin(profile.emails[0].value)
    if(!user){
        const data = { email: profile.emails[0].value, password: await hashPassword(`NO_PASSWORD_${profile.id}`) }
        user = await prisma.users.create({ data })
    }
    const paramsToken = { user_id: user.id, user_email: user.email, user_role: user.role }
    user.token = jwtTokens(paramsToken)
    return done(null, user);
}

const refresh_token = async (req, res) => {
    try {
        const refreshToken = req.headers.cookie.split('=')[1]
        if (!refreshToken) return res.status(401).json({error: "Null refresh token"})

        verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
            if (error) return res.status(403).json({error: error.message})
            const userJwt = jwtTokens(user)
            res.cookie('refresh_token', userJwt.refreshToken, {httpOnly: true})
            res.json(userJwt)
        })
    } catch (error) {
        res.status(401).json({error: error.message})
    }
}

const delete_token = async (req, res) => {
    try {
        res.clearCookie('refresh_token')
        return res.status(200).json({ message: "Refresh token deleted" })
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}

module.exports = { login, googleAuth, refresh_token, delete_token }