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