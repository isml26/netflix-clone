const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
    },
    genre: {
        type: String,
    },
    content: {
        type: Array,
    }

}, {
    timestamps: true,
    versionKey: false,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id
        }
    }
});

const List = mongoose.model('List', listSchema);

module.exports = List;