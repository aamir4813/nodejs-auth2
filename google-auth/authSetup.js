const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// after authentication success..
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// after evvery authentication called cookie-session will
// trigger this function and take id from this cookie
// find user in db
passport.deserializeUser(function(id, done) {
    // No db with that
    // User.findById(id, function(err, user) {
    done(null, user);
    // });
});
// console.log(process.env.GOOGLE_CLIENT_ID);
passport.use(
    new GoogleStrategy({
            clientID: "761993603371-b9nsbghim86miat9l89ojmvn3jv5hb3v.apps.googleusercontent.com",
            clientSecret: "yWGwqhXd35GyTU3tMn_qxbTg",
            callbackURL: "http://localhost:3000/auth/google/callbacks"
        },
        function(accessToken, refreshToken, profile, done) {
            // here we can get profile.id to find if user is already registered
            // but for the sake of simplicity and given problem statement returning just profile
            return done(null, profile);
            // after all this serialized will be called
        }
    ));