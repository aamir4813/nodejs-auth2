const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require('passport');
// Import route here
const authRoute = require("./controller/auth");
const postRoute = require('./controller/posts');
const googleOauth = require('./google-auth/googleRoutes');
const cookieSession = require('cookie-session')
require('./google-auth/authSetup')
const { session } = require('passport');

// config for enviromental process
dotenv.config();

// Connection with DB
var doURL = process.env.DB_CONNECT;
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("------- DB Connected --------"));

// PASSPORT MIDDLEWARE FUNCTION
app.use(passport.initialize());
app.use(passport.session());

// cookie Config

app.use(cookieSession({
    name: 'google-cookie-session',
    keys: ['key1', 'key2']
}))


app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/')
});


app.use(express.json());
// Router Middlware
app.use("/api/user", authRoute);
app.use('/api/posts', postRoute);
app.use(googleOauth);
app.listen(3000, () => console.log("i'm running"));