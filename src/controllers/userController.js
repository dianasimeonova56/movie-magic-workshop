import {Router} from 'express';

const userController = Router();

userController.get('/register', (req, res) => {
    res.send('Register page');
})


export default userController;