const { verify } = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.status(401).json({ error: "Null token" })

    verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error) return res.status(403).json({ error: error.message })
        req.user = user
        next()
    })
}

const roleAuthorization = (role) => {
    return (req, res, next) => {
        const userRole = req.user.user_role
        if (parseInt(role) <= userRole) {
            next()
        } else {
            return res.status(401).json({ error: "You don't have permission" })
        }
    }
}

const userAuthorization = (req, res, next) => {
    const email = req.params.email
    const user = req.user
    if (user.user_role === parseInt(process.env.ROLE_ADMIN) || user.user_email === email) {
        next()
    } else {
        return res.status(401).json({ error: "You can't access others information" })
    }
}

module.exports =  { authenticateToken, roleAuthorization, userAuthorization }