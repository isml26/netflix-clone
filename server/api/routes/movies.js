const express = require("express");
const Movie = require("../../models/Movie");
const verify = require("../../common/middlewares/verifyToken");


const router = express.Router();

//CREATE MOVIE
router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        const movie = new Movie(req.body);
        try {
            await movie.save();
            res.status(201).json(movie);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allowed!");
    }
});

//GET RANDOM MOVIE
router.get("/random", async (req, res) => {
    const type = req.query.type; //?type=series;
    let movie;
    try {
        if (type === "series") {
            movie = await Movie.aggregate([{
                    $match: {
                        isSeries: true
                    }
                },
                {
                    $sample: {
                        size: 1
                    }
                }
            ])
        } else {
            movie = await Movie.aggregate([{
                    $match: {
                        isSeries: false
                    }
                },
                {
                    $sample: {
                        size: 1
                    }
                }
            ])
        }
        res.status(200).send(movie);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL
router.get("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const movies = await Movie.find();
            res.status(200).json(movies.reverse());
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allowed!");
    }
});


router.put("/:id",verify,async (req, res) => {
    try {
        if (req.user.isAdmin) {
        const movie = await Movie.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {
            new: true
        });
            return res.status(200).json(movie);
            
    } else {
        res.status(403).json("You are not allowed!");
    }
    } catch (error) {
        return res.status(500).json(err);
    }


});

router.delete("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            await Movie.findByIdAndDelete(req.params.id);
            res.status(200).json("Movie has been deleted");
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allowed!");
    }
});

router.get("/find/:id", async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;