const users = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const download = require('../model/downloadRecipeModel');

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
                username, email, password: encryptedPassword,profileImage:''
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

// edit user
exports.editUserController=async(req,res)=>{
    const {profileImage}=req.body
    const userId=req.userId

    try {
        const existingUser = await users.findById({_id:userId})
        existingUser.profileImage=profileImage
        await existingUser.save()
        res.status(202).json(existingUser)
    } catch (error) {
     res.status(404).json({message:error.message})   
    }
}

// get all users
exports.getAllUsersController=async(req,res)=>{
    console.log(`Inside get all user controller`);

    try {
        const allUsers=await users.find({role:'User'})
        res.status(202).json(allUsers)
    } catch (error) {
        res.status(401).json({message:error.message})
    }
    
}

// download-list
exports.getAllDownloadListController=async(req,res)=>{
    console.log(`get all download list controller`);

    try {
        const allDownloads=await download.find()
        res.status(202).json(allDownloads)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
    
}