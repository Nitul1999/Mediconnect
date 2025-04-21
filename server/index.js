const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())  
require('dotenv').config


const port = process.env.PORT || 1001
const dbconfig = require('./config/dbconnection')

const adminroutes = require('./router/admin');
const employeeroutes = require('./router/employee')
const personroutes = require('./router/person')


//api end point start//
app.use('/api/admin',adminroutes)
app.use('/api/employee',employeeroutes)
app.use('/api/person',personroutes)


//running app 
dbconfig.once('connected',()=>{
    console.log('connected to database....')
    app.listen(port,()=>{
        console.log(`app is running on ${port}`)
    })
})
