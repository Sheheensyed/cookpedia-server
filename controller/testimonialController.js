const testimonials = require('../model/testimonial')

exports.addTestimonialController = async (req, res) => {
    console.log('inside add testimonial controller');
    const { name, email, message } = req.body
    console.warn(name, email, message);

    try {
        const newTestimonial = new testimonials({
            name, email, message
        })
        await newTestimonial.save()
        res.status(200).json(newTestimonial)

    } catch (error) {
        res.status(401).json({ message: error })
    }

}

exports.getAllTestimonialController=async(req,res)=>{
    console.log(`inside get all testimonial controller`);

    try {
        const allFeedbacks = await testimonials.find()
        res.status(202).json(allFeedbacks)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
    
}

exports.updateTestimonialController=async(req,res)=>{
    console.log(`Inside update Testimonial Controller`);

    // get feedback id from url parameter
    const {id}= req.params

    // get status of feedback from url query
    const status = req.query.status

    // update status of feedback with given id
    try {
        const existingFeedback= await testimonials.findById({_id:id})
        existingFeedback.status=status
        await existingFeedback.save()
        res.status(202).json(existingFeedback)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
    
}