const userSchema = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

exports.register = async (req,res) =>{
    try{

        const {name,email,password} = req.body

        const found = await userSchema.findOne({email})
        if(found) {res.status(400).send({msg :'vous avez deja un compte avec cet email'})}

//creation d'un nouveau compte  
        const newUser = await new userSchema(req.body)
 
        //partie bcrypt pour le mdp
        const saltRounds = 10 ;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        newUser.password = hash
        //partie securite : token 

        const payload = { id : newUser._id}

        var token = jwt.sign(payload,process.env.privateKey)
        
        newUser.save()

        res.status(200).send({msg : 'welcome to our website',newUser ,token })
    }
    catch(err){
        console.log(err)
        res.status(500).send({msg :'theres something wrong'})

    }
}

exports.signin = async (req,res) =>{
    try{
        const {email,password} = req.body

        const found = await userSchema.findOne({email})
        if(!found) {res.status(400).send({msg :'please go to sign up'})}

        //partie mdp
        const match = await bcrypt.compare(password,found.password)
        if(!match){res.status(400).send({msg:'password is wrong'})}
        const payload = { id : found._id}

        var token = jwt.sign(payload,process.env.privateKey)
        res.status(200).send({msg :'welcome',token,found})





    }
    catch(err){
        res.status(500).send({msg :'theres something wrong'})

    }
}