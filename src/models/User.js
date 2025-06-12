import {Schema, model} from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'User email is required'],
        unique: true,//db validation, not a model validation
        
         
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
    },
})

userSchema.pre('save', async function() {
    //const salt = await bcrypt.genSalt(10);

    //we can generate salt with .hash direclty
    //this.password = await bcrypt.hash(this.password, salt);

    this.password = await bcrypt.hash(this.password, 10); //10 rounds of generating salt
})
const User = model('User', userSchema);

export default User;