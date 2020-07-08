const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// after authentication success..
passport.serializeUser(function(user, done) {
    done(null, user);
});

// after evvery authentication called cookie-session will
// trigger this function and take id from this cookie
// find user in db
passport.deserializeUser(function(user, done) {
    // No db with that
    // User.findById(id, function(err, user) {
    done(null, user);
    // });
});

passport.use(
    new GoogleStrategy({
            clientID: `${process.env.GOOGLE_CLIENT_ID}`,
            clientSecret: `${process.env.GOOGLE_CLIENT_KEY}`,
            callbackURL: `${process.env.GOOGLE_CALLBACK_URL}`
        },
        function(accessToken, refreshToken, profile, done) {
            // here we can get profile.id to find if user is already registered
            // but for the sake of simplicity and given problem statement returning just profile
            return done(null, profile);
            // after all this serialized will be called
        }
    ));