const express = require("express");
const List = require("../../models/List");
const verify = require("../../common/middlewares/verifyToken");


const router = express.Router();

//CREATE LIST
router.post("/", verify, async (req, res) => {
    
    if (req.user.isAdmin) {
        const list = new List(req.body);
        try {
            await list.save();
            res.status(201).json(list);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allowed!");
    }
});


//DELETE
router.delete("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            await List.findByIdAndDelete(req.params.id);
            res.status(200).json("List has been deleted");
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can delete update your account!!");
    }
});

//GET LISTS
router.get("/", verify, async (req, res) => {
    const typeQuery = req.query.type; //?type=series
    const genreQuery = req.query.genre; //?genre=crime or // ?type=series&genre=comedy
    let list=[];
    try {
        if(typeQuery){
            if(genreQuery){
                list = await List.aggregate([
                    {$sample:{size:10}},
                    {$match:{type:typeQuery,genre:genreQuery}}
                ]);
            }
            else{
                list = await List.aggregate([
                    { $sample : { size : 10 } },
                    { $match : { type : typeQuery } }
                ]);
            }
        }else{
            list = await List.aggregate([{ $sample:{size:10}}]);
        }
        res.status(200).json(list);
    } catch (err) {
        res.status(500).json(err);
    }

});

module.exports = router;