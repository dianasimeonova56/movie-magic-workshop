import User from "../models/User.js"
import bcrypt from 'bcrypt';
import { generateAuthToken } from "../utils/auth.js";

export default {
    async register(userData) {
        const user = await User.create(userData);

        const token = generateAuthToken(user);
        
        return token;
        
    },
    async login(email, password) {
        const user = await User.findOne({ email });

        if (!user) {
            return new Error("No such user!");
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return new Error('Invalid password!');
        }

        const token = generateAuthToken(user);

        return token;
    }
}


