import jsonwebtoken from 'jsonwebtoken'
import { jwtSecret } from "../config/general.js";
export const auth = (req, res, next) => {
    const token = req.cookies['auth'];

    if (!token) {
        return next();// allow to continue to the next action
    }

    try {
        const { id, email } = jsonwebtoken.verify(token, jwtSecret);

        req.user = { id, email }; // attach to the request with new info

        next();
    } catch (err) {
        res.clearCookie('auth'); // if its invalid cookie, we should clear it
        res.redirect('/users/login');
    }
};