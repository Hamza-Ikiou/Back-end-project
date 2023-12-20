const {Router} = require('express')
const { login, refresh_token, delete_token, googleAuth} = require('./controller')
const authRouter = new Router()
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const passport = require('passport')

authRouter.use(passport.initialize());

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_GOOGLE_URL,
        passReqToCallback: true,
    },
    googleAuth
));

authRouter.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

authRouter.get('/auth/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/' }),
    (req, res) => {
        res.redirect(`${process.env.FRONT_BASE_URL}/user-profile?token=${req.user.token.accessToken}`)
    }
);

authRouter.route('/auth/login')
    .post(login)

authRouter.route('/refresh_token')
    .get(refresh_token)
    .delete(delete_token)

module.exports = authRouter