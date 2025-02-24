const download = require("../model/downloadRecipeModel");
const savedRecipe = require("../model/saveRecipeModel");
const { downloadRecipe } = require("./downloadRecipeController");

exports.saveRecipeController = async (req, res) => {
    console.log(`Inside save Recipe Controller`);
    const { id } = req.params
    const userId = req.userId
    const { name, image } = req.body
    console.log(id, userId, name, image);

    try {
        const existingRecipe = await savedRecipe.findOne({ recipeId: id, userId })

        if (existingRecipe) {
            res.status(406).json('Selected Recipe already in your collection. Please add Another!!!')
        } else {
            const newRecipe = new savedRecipe({
                recipeId: id, name, image, userId
            })
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// user recipe collection get - authorization
exports.getUserRecipeController = async (req, res) => {
    console.log(`Inside get user recipe controller`)
    // get userId to get user recipe collection
    const userId = req.userId
    try {
        const UserRecipeCollection = await savedRecipe.find({ userId })
        res.status(200).json(UserRecipeCollection)

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// remove save recipe - authorized user
exports.removeSavedRecipeController = async (req, res) => {
    console.log(`Inside remove saved recipe controller`);
    // 1. get item _id to  be removed from req params
    const { id } = req.params

    // 2. remove item from the collection usind findBtidAndDelete

    try {
        const removeSaveRecipe = await savedRecipe.findByIdAndDelete({ _id: id })
        res.status(202).json(removeSaveRecipe)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

}

// get user download recipes
exports.getUserDownloadList = async (req, res) => {
    console.log(`Inside get user download list`);

    // get userId from jwt
    const userId = req.userId

    // find document with userId from model
    try {
        const allUserdownload = await download.find({ userId })
        res.status(202).json(allUserdownload)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

}