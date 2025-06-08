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

        // delegated space that can be injected into the context of view engines
        //temporary for the life of the current request
        res.locals.user = { id, email }; // this way we can check for the dynamic nav of we are logged in

        next();
    } catch (err) {
        res.clearCookie('auth'); // if its invalid cookie, we should clear it
        res.redirect('/users/login');
    }
};

export const isAuth = (req, res, next) => {
    //if you are authenticated, continue, else go to login
    if(!req.user) {
        return res.redirect('/users/login');
    }

    next();
}