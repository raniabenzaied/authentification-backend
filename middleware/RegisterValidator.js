const { body, validationResult } = require('express-validator');



exports.registerValidator =[
    body('email','please put a valid email').isEmail(),
    body('password','please enter a passwor with min 8 caracters').isLength({min:8})
]




exports.loginValidator =[
  body('email','please put a valid email').isEmail(),
]




exports.validation = async(req,res,next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next()

}