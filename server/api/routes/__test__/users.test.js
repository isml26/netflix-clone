const request = require("supertest");// create fake request
const mongoose = require("mongoose");
const app = require("../../../loaders/app");

it("returns 200 if user gets user_stats successfully",async()=>{
    const token = await global.signIn();
    return request(app)
    .get('/api/users/stats')
    .set("token",token)
    .expect(200);
});
