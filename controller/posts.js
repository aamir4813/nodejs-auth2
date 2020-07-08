const router = require("express").Router();
const verify = require('./verifytoken');

router.get('/', verify, (req, res) => {
    res.json({
        posts: {
            tiile: "First Post",
            Desciption: "Hey You can't acess ",
        },
    });
});

module.exports = router;