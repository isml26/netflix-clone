const request = require("supertest");// create fake request
const mongoose = require("mongoose");
const app = require("../../../loaders/app");

it("returns 200 if user gets all lists successfully",async()=>{
    const token = await global.signIn();
    return request(app)
    .get('/api/lists/')
    .set("token",token)
    .expect(200);
});

it("returns 403 if it is not admin who try to add list",async()=>{
    const token = await global.signIn();

    const id_1 = new mongoose.Types.ObjectId().toHexString();
    const id_2 = new mongoose.Types.ObjectId().toHexString();
    const id_3 = new mongoose.Types.ObjectId().toHexString();
    return request(app)
    .post('/api/lists/')
    .set("token",token)
    .send({
        title: "CRIME MOVIES",
        type: "movies",
        genre: "Crime",
        content: [
            id_1,
            id_2,
            id_3,
        ]}
    ).expect(403);
})
