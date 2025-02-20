const download = require("../model/downloadRecipeModel");

// add to downloadRecipe
exports.downloadRecipe = async (req, res) => {
    console.log('Inside download recipe controller');

    const { id } = req.params
    const userId = req.userId
    const { name, image, cuisine } = req.body
    console.log(id, userId, name, image, cuisine);


    try {
        // check recipe already in downloads
        const existingRecipe=await download.findOne({recipeId:id})
        if(existingRecipe){
            // increment count of recipe by 1 - update
            existingRecipe.count+=1
            await existingRecipe.save()
            res.status(200).json(existingRecipe)
        }else{
            // add recipe to your model - insert
            const newRecipe= new download({
                recipeId:id,recipeName:name,recipeImage:image,recipeCuisine:cuisine,count:1,userId
            })
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}