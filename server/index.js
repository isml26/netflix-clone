// const express = require("express");
const mongoose = require("mongoose");  
const dotenv =  require("dotenv");
// // const cors = require("cors");
// const auth = require("./api/routes/auth");
// const users = require("./api/routes/users");
// const movies = require("./api/routes/movies");
// const lists = require("./api/routes/lists");

// const app = express();

dotenv.config();

// app.use(express.json());
// app.use(express.urlencoded({extended: true,}));
// // app.use(cors());


// mongoose.connect(process.env.MONGO_URI).then(console.log("Connected Database!")).catch((err)=>console.log(err));


// app.use("/api/auth",auth);
// app.use("/api/users",users);
// app.use("/api/movies",movies);
// app.use("/api/lists",lists);


 mongoose.connect(process.env.MONGO_URI).then(console.log("Connected Database!")).catch((err)=>console.log(err));


const PORT = process.env.PORT || 5000 ;

const app = require("./loaders/app");

app.listen(PORT, ()=>{
    console.log(`App started on ${PORT}`);
});
