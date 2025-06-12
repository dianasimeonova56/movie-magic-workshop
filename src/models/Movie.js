import { Schema, model, Types } from "mongoose";

const maxYearAllowed = new Date().getFullYear() + 5;
const validCharsPattern = /^[a-zA-Z0-9 ]+$/;
const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, "Field title is required!"],
        validate: [validCharsPattern, 'Invalid title format! Only english letters, digits and whitespaces are allowed'],
        minLength: [5, "Should be at least 5 chars long!"],
    },
    category: {
        type: String,
        required: [true, "Field category is required!"],
        validate: [validCharsPattern, 'Invalid category format! Only english letters, digits and whitespaces are allowed'],
        minLength: [5, "Should be at least 5 chars long!"],
        enum: {
            values: ['tv-show', 'animation', 'movie', 'documentary', 'short-film'],
            message: (props) => `${props.value} is not a valid category`
        }
    },
    genre: {
        type: String,
        required: [true, "Field genre is required!"],
        lowercase: true, //not a validator, but a sanitizer -> it will make it lowercase
        validate: [validCharsPattern, 'Invalid genre format! Only english letters, digits and whitespaces are allowed'],
        minLength: [5, "Should be at least 5 chars long!"],
    },
    director: {
        type: String,
        required: [true, "Field director is required!"],
        validate: [validCharsPattern, 'Invalid director format! Only english letters, digits and whitespaces are allowed'],
        minLength: [5, "Should be at least 5 chars long!"],
    },
    year: {
        type: Number,
        required: [true, "Field year is required!"],
        min: [1990, "Year cannot be lower than 1990!"],
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
        minLength: [20, 'Description should be at least 20 chars'],
        validate: [validCharsPattern, 'Invalid title format! Only english letters, digits and whitespaces are allowed'],
        maxLength: [1000, "Description is too long!"],
    },
    //reference; array with object ids that refer to the Cast model
    casts: [
        {
            type: Types.ObjectId,
            ref: 'Cast',
        }
    ],
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }
})

const Movie = model('Movie', movieSchema);

export default Movie;