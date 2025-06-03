import {Schema, model} from "mongoose";

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
    },
    rating: {
       type: Number,
        required: [true, "Field rating is required!"],
    },
    description: {
        type: String,
        required: [true, "Field description is required!"],
        maxLength: [100, "Description is too long!"],
    }
})

const Movie = model('Movie', movieSchema);

export default Movie;