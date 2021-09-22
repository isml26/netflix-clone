const request = require("supertest");// create fake request
const mongoose = require("mongoose");
const app = require("../../../loaders/app");

it("responds with a jwt when given valid credentials",async()=>{
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
    expect(response.get("token")).toBeDefined();
})