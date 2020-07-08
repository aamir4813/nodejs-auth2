const passport = require('passport');
const { session } = require('passport');
const router = require('express').Router();

// const isLogged = (req, res, next) => {
//     if (req.user)
//         next();
//     else {
//         res.status(401).send('Not Authrized');
//     }
// };

router.get('/', (req, res) => res.send('You are not logged in '));
router.get('/failed', (req, res) => res.send('You have Failed'));
console.log(session);
router.get('/accessd', (req, res) => res.send(`Welcome Here Mr ${req.session.displayName}`));

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callbacks', passport.authenticate('google', { failureRedirect: '/failed' }),
    function(req, res) {
        session.bind(res);
        res.redirect('/accessd')
    });

router.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/')
});

module.exports = router;