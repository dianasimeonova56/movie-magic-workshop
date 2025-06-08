import { Router } from 'express';
import userService from '../services/userService.js';

const userController = Router();

userController.get('/register', (req, res) => {
    res.render('user/register')
})

userController.post('/register', async (req, res) => {
    const { email, password, rePassword } = req.body;

    const token = await userService.register({ email, password, rePassword });

    res.cookie('auth', token);

    res.redirect('/');
})

userController.get('/login', (req, res) => {
    res.render('user/login')
})

userController.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const token = await userService.login(email, password);

    res.cookie('auth', token);

    res.redirect('/')
})

userController.get('/logout', async (req, res) => {
    res.clearCookie('auth'); // clear the current cookie to clear the session

    // TODO Invalidate token -> when we end the session we need to make the token invalid to prevent hijacking

    res.redirect('/')
})


export default userController;