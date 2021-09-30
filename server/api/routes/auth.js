const express = require("express");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const router = express.Router();

router.post("/register", async (req, res) => {
    const newUser = new User({
        userName: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
    });
    try {
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(401).json(error)
    }
})

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email,
        });
        
        !user && res.status(401).json("User does not exist");

        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
        
        if(originalPassword !== req.body.password){
            return res.status(401).json("Wrong password or email");
        }
        const accessToken = jwt.sign({id: user._id, isAdmin: user.isAdmin }, 
        process.env.SECRET_KEY, 
        { expiresIn: "5d"});

        const {
            password,
            ...info
        } = user._doc;
        //res.setHeader("token","Bearer "+accessToken);
        return res.status(201).json({...info,accessToken});
        
        
    } catch (err) {
        return res.status(500).json(err);
    }
})


module.exports = router;