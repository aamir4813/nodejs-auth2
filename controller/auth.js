const router = require("express").Router();
const User = require("../models/User");
const { loginValidation, regitserValidation } = require("./validation");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post("/register", async (req, res) => {
    
    const {error} = regitserValidation(req.body);
    // CHECK Schema VALIDATION 
    if ( error ) return res.status(400).send(error.details[0].message);
    
    // IF EMAIL IS ALREADY EXISTS
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send({"email":"EMAIL ALREADY EXISTS"});
    
    // HASHED PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPasswrod = await bcrypt.hash(req.body.password , salt);

    const newuser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPasswrod,
  });
  try {
    const userSaved = await newuser.save();
    res.send(userSaved);
  } catch (error) {
    res.send(400).send(error);
  }
});

router.post('/login' , async (req , res) => {
    const {error} = loginValidation(req.body);
    
    // CHECK LOGIN SCHEMA VALIDATION
    if( error ) return res.status(400).send(error.details[0].message);

    // CHECK VALID EMAIL EXISTS
    const user = await User.findOne({email : req.body.email});
    if( !user ) return res.status(400).send({'error':'Email or Password is Incorrect ! '});
    
    //  CHECK VALID PASSWORD

    const validPassword = bcrypt.compare(req.body.password , user.password);

    if( !validPassword ) return res.status(400).send({'error':'Email or Password is Incorrect ! '});

    // GENERATE JWT
    const token = jwt.sign({_id : user._id} , process.env.JWT_TOKEN);
    res.header('x-access-token' , token).send({"token" : token});
});


module.exports = router;
