import {Schema, model, Types} from "mongoose";

const maxYearAllowed = new Date().getFullYear() + 5;
const movieSchema = new Schema({
    title:  {
        type: String,
        required: [true, "Field title is required!"],
    },
    category: {
        type: String, 
        required: [true, "Field category is required!"],
    },
    genre: {
        type: String,
        required: [true, "Field genre is required!"],
        lowercase: true, //not a validator, but a sanitizer -> it will make it lowercase
    },
    director: {
        type: String,
       required: [true, "Field director is required!"],
    },
    year: {
        type: Number,
        required: [true, "Field year is required!"],
        min: 1970,
        max: [maxYearAllowed, `Year cannot be  larger than ${maxYearAllowed}`],
    },
    imageUrl: {
        type: String,
        required: [true, "Field imageUrl is required!"],
        validate: [/^https?:\/\//, 'Invalid ImageUrl!'],
    },
    rating: {
       type: Number,
        required: [true, "Field rating is required!"],
        min: [1, "Rating cannot be lower than 1"],
        max: [10, "Rating should not be higher than 10!"],
    },
    description: {
        type: String,
        required: [true, "Field description is required!"],
        maxLength: [1000, "Description is too long!"],
    },
    //reference; array with object ids that refer to the Cast model
    casts: [
        {
            type: Types.ObjectId,
            ref: 'Cast',
        }
    ]
})

const Movie = model('Movie', movieSchema);

export default Movie;