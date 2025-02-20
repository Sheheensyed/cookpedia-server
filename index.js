// import .env
require('dotenv').config()

// import express
const express = require('express')

// import cors
const cors = require('cors')

// import router
const router = require('./router/router')

//
require('./config/connection')

// create server
const cpServer = express()

// use cors
cpServer.use(cors())

// use express - parse
cpServer.use(express.json())



// port
const PORT = 4000 || process.env.PORT

// listen
cpServer.listen(PORT,()=>{
    console.warn(`cpServer started at port number : ${PORT} waiting for client request`);
    
})

// get request
cpServer.get('/',(req,res)=>{
    res.status(200).send(`
        <marquee scrollamount="20"><h1 style="color:grey"> Cookpedia server started and waiting for <span style="color:red">client request</span></h1></marquee>
        `)
    })

    
    // use router
    cpServer.use(router)