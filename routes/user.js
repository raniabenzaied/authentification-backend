const express = require('express')

const userRouter = express.Router()

const {register,signin} = require('../controllers/user')
const{validation,registerValidator,loginValidator} = require('../middleware/RegisterValidator')
const {isAuth} = require ('../middleware/isAuth')


//partie routes
userRouter.post('/signup',registerValidator,validation,register)
userRouter.post('/signin',loginValidator,signin)
userRouter.get('/getaUser',isAuth,(req,res)=>{
    res.send(req.user)
})









module.exports = userRouter
