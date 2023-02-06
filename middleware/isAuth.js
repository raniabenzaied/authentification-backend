var jwt = require('jsonwebtoken')

const userSchema = require('../model/user')

exports.isAuth = async(req,res) =>{
    try{
        const token = req.header('Authorized')
        var decoder = jwt.verify(token,process.env.privateKey)

        if(!decoder){return res.status(400).send({msg:'you are not welcome'})}

        const user = await userSchema.findById(decoder.id)

        req.user = user
        next()

    }
    catch(err){
        res.status(500).send({msg:'you are not authorized'})
    }

}