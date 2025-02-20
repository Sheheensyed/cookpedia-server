const mongoose = require('mongoose')

const testimonialSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    message: {
        required: true,
        type: String,
    },
    status:{
        type:String,
        required:true,
        default: "Pending"
    }
})

const testimonials = mongoose.model('testimonials', testimonialSchema)
module.exports = testimonials