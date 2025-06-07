import { Router } from 'express';
import userService from '../services/userService.js';

const userController = Router();

userController.get('/register', (req, res) => {
    res.render('user/register')
})

userController.post('/register', async (req, res) => {
    const {email, password, rePassword} = req.body;

    await userService.register({email, password, rePassword})

    res.redirect('/users/login');
})

userController.get('/login', (req, res) => {
    res.render('user/login')
})

userController.post('/login', async (req, res) => {
    const {email, password } = req.body;

    const token = await userService.login(email, password);
    
    

    res.redirect('/')
})


export default userController;