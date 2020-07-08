const Joi = require('@hapi/joi');

const regitserValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required() ,
  });

    return schema.validate(data);

};


const loginValidation = (data) => {
    const schema = Joi.object({
        email : Joi.string().email().min(6).required(),
        password : Joi.string().min(6).required()
    });

    return schema.validate(data);
};


module.exports.loginValidation = loginValidation;
module.exports.regitserValidation = regitserValidation;