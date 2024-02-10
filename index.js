//1)import dotenv
//Loads .env contents into process.env by default
require('dotenv').config()

//2)import express
const express = require('express')

//3)import cors
const cors = require('cors')

//import router
const router = require('./Routers/router')

//import connection.js
require('./DB/connections')

//4)create server
// Creates an Express application. The express() function is a top-level function exported by the express module.

const pfserver =express()

//5)use of cros in server
pfserver.use(cors())

//6)Returns middleware that only parses json -javascript object
pfserver.use(express.json())

//use router
pfserver.use(router)

//server use upload folder
//first arg-the way in which other application should use this folder
//second argument-export that folder -express.static
pfserver.use('/uploads',express.static('./uploads'))

//7)custmize the port - by default-3000

const PORT = 5000 || process.env



//8)to run server
pfserver.listen(PORT,()=>{
    console.log(`SERVER RUNNING SUCCESSFULLY AT PORT NUMBER ${PORT}`);
})
pfserver.get('/',(req,res)=>{

    res.send(`<h1 style="color:green">project fair server running successfully and ready to accept request from client</h1>`)

})

//post request

// pfserver.post('/',(req,res)=>{
//     res.send('post request')
// })

//put request
// pfserver.put('/',(req,res)=>{
//     res.send('put request')
// })