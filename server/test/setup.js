const  request  = require("supertest");
const memory = require("mongodb-memory-server");
const mongoose = require("mongoose");
const User = require("../models/User");
require("dotenv").config();
const app = require("../loaders/app");


// MongoMemoryServer allows us to run multiple different test suites at
// the same time across different projects without them to reach out to same copy of Mongo 

//that function is going to run before all
//of our tests start to be execudet
let mongo;

beforeAll(async () => {
    process.env.SECRET_KEY = "kunefe";

    mongo = new memory.MongoMemoryServer();
    await mongo.start();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

global.signIn = async()=>{
    await request(app)
    .post("/api/auth/register")
    .send({
        username:"cılgın",
        email:"test@hotmail.com",
        password:"asdjaskndlş"
    })
    .expect(201);

    const response = await request(app)
    .post("/api/auth/login")
    .send({
        email:"test@hotmail.com",
        password:"asdjaskndlş"
    })
    .expect(201);

    expect(response.body.accessToken).toBeDefined();

    // const userId = await response.body._id;
    // await User.findByIdAndUpdate(userId,{
    //     isAdmin:true
    // })
    // const user = await User.findById(userId)
    // console.log(user.isAdmin);

    const token = "Bearer "+response.body.accessToken;
    return token;
}