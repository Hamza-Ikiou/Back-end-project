const { sign } = require("jsonwebtoken")

function jwtTokens({ user_id, user_email, user_role }) {
    const payload = { user_id, user_email, user_role }
    const accessToken = sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
    const refreshToken = sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'})
    return { accessToken, refreshToken }
}

module.exports = { jwtTokens }