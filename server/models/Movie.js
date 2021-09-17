const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    img: {
        type: String,
    },
    imgTitle: {
        type: String,
    },
    imgThumbnail: {
        type: String,
    },
    trailer: {
        type: String,
    },
    video: {
        type: String,
    },
    img: {
        type: String,
    },
    year: {
        type: String,
    },
    limit: {
        type: Number,
    },
    genre: {
        type: String,
    },
    isSeries: {
        type: Boolean,
        default: false,
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
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id
        }
    }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;