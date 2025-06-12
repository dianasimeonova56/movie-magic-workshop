import { Schema, model } from "mongoose"

const validCharsPattern = /^[a-zA-Z0-9 ]+$/;

const castSchema = new Schema({
    name: {
        type: String,
        required: true,
        validate: [validCharsPattern, 'Invalid name format! Only english letters, digits and whitespaces are allowed'],
        minLength: [5, "Should be at least 5 chars long!"],
    },
    age: {
        type: Number,
        required: true,
        min: [1, 'Age should be at least 1 year old'],
        max: [120, "Age should be less than 120 years old"],
    },
    born: {
        type: String,
        required: true,
        validate: [validCharsPattern, 'Invalid title format! Only english letters, digits and whitespaces are allowed'],
        minLength: [10, "Born be at least 5 chars long!"],
    },
    imageUrl: {
        type: String,
        required: true,
        validate: [/^https?:\/\//, 'Invalid ImageUrl!'],
    },

})

const Cast = model("Cast", castSchema);

export default Cast;