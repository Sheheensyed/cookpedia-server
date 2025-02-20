//import jwt
const jwt = require('jsonwebtoken')

const jwtMiddleware = (req, res, next) => {
    //logic
    console.log(`inside jwt middleware`);
    const token = req.headers[`authorization`].split(" ")[1]
    console.log(token);

    if(token){
        try {
            const jwtResponse = jwt.verify(token, process.env.JWTPASSWORD)
            console.log(jwtResponse);
            req.userId =jwtResponse.userId
            next()
    
    
        } catch (error) {
            res.status(401).json(`Authorization failed due to`, error)
        }

    }else{
        res.status(404).json({message:`Authorization failed`})
    }



}

module.exports = jwtMiddleware