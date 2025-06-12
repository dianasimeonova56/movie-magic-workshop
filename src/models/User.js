import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'User email is required'],
        unique: true,//db validation, not a model validation
        // validate: {
        //     //custom schema validator
        //     validator: async function (value) {
        //         const existingUser = await User.findOne({ email: value });

        //         if (existingUser) {
        //             throw new Error("User already exists");
        //         }
        //     }
        // }

    },
    password: {
        type: String,
        required: [true, "Please provide password"],
    },
})
//validate if user email is unique with custom validator
// userSchema.path('email').validate(async function (value) {
//     const existingUser = await User.findOne({ email: value });

//     if (existingUser) {
//         throw new Error("User already exists");
//     }

// })

userSchema.pre('save', async function () {
    //const salt = await bcrypt.genSalt(10);

    //we can generate salt with .hash direclty
    //this.password = await bcrypt.hash(this.password, salt);

    this.password = await bcrypt.hash(this.password, 10); //10 rounds of generating salt
})
const User = model('User', userSchema);

export default User;