import { Router } from 'express';
import userService from '../services/userService.js';

const userController = Router();

userController.get('/register', (req, res) => {
    res.render('user/register')
})

userController.post('/register', async (req, res) => {
    //GET DATA from req
    const userData = req.body;

    //register user
    await userService.register(userData)
    //redirect to login
    res.redirect('/users/login');
})


export default userController;