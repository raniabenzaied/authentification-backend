const express = require('express')

const cors = require('cors')

const connectdb = require('./config/connectdb')
const userRouter = require('./routes/user')

const app = express()

const port = 5003



app.use(cors())
require('dotenv').config()

app.use(express.json())

connectdb()
app.use('/auth/user' ,userRouter)


app.listen(port,err =>{
    err?console.log(err) : console.log(`yes go to the port ${port}`)
})
