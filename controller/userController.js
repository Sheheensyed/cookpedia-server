const users = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// add user
exports.addUserController = async (req, res) => {
    console.log('inside add user controller');

    const { username, email, password } = req.body
    console.log(username, email, password);

    try {
        const existingUsers = await users.findOne({ email })

        if (existingUsers) {
            res.status(406).json({ message: "User already exist" })
        } else {
            const encryptedPassword = await bcrypt.hash(password, 10)
            const newUser = new users({
                username, email, password: encryptedPassword
            })
            await newUser.save()
            res.status(200).json({ message: newUser })
        }
    } catch (error) {
        res.status(403).json({ message: "Registration failed" })
    }
}

// login-user-controller
exports.loginUserController = async (req, res) => {
    console.log('inside login controller');
    const { email, password } = req.body

    try {
        const existingEmail = await users.findOne({ email })
        if (existingEmail) {

            let isUserPasswordMatch = await bcrypt.compare(password, existingEmail.password)
            if (isUserPasswordMatch || password == existingEmail.password) {
                const token = jwt.sign({ userId: existingEmail._id }, process.env.JWTPASSWORD)
                res.status(200).json({ user: existingEmail, token })
            } else {
                res.status(404).json({ message: "Invalid email or password" })
            }
        } else {
            res.status(403).json({ message: `Invalid email or password` })
        }
    } catch (error) {

    }

}