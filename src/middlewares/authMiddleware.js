import jsonwebtoken from 'jsonwebtoken'
import { jwtSecret } from "../config/general.js";
export const auth = (req, res, next) => {
    const token = req.cookies['auth'];

    if (!token) {
        return next();// allow to continue to the next action
    }

    try {
        const decoded = jsonwebtoken.verify(token, jwtSecret);
 

        next();
    } catch (err) {
    res.clearCookie('auth'); // if its invalid cookie, we should clear it
       res.redirect('/users/login');
    }
};