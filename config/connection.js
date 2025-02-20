// import mongoose
const mongoose = require('mongoose')

const connectionString = process.env.CONNECTIONSTRING

mongoose.connect(connectionString).then((res)=>{
    console.warn(`Mongodb connected successfully with cookpedia server`);
    
}).catch(err=>{
    console.error({message:`Mongodb connection failed due to ${err}`});
    
})