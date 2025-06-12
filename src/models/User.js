import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'User email is required'],
        unique: true,//db validation, not a model validation
        minLength: [10, 'Email should be at least 10 chars long'],
        validate: [/@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/, 'Invalid email format']
        
        // validate: {
        //     //custom schema validator
        //     validator: async function (value) {
        //         const existingUser = await User.findOne({ email: value });

        //         return !existingUser;
        //     }
        // }

    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        validate: /^[a-zA-Z0-9]+$/,
        minLength: [6, 'Password should be at least 6 chars long'],

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

//validate repass using virtual setter
userSchema.virtual('rePassword') // wont be saved in the db
    .set(function(value) {
        if(this.password !== value) {
            throw new Error("Password mismatch")
        }
    });

const User = model('User', userSchema);

export default User;