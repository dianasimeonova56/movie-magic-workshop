import { Router } from 'express'

import homeController from './controllers/homeController.js'; // modular router
import movieController from "./controllers/movieController.js";
import castController from "./controllers/castController.js";
import userController from "./controllers/userController.js";

const routes = Router();

//config routes
routes.use(homeController) // app -> main router, use the modular router
routes.use('/movies', movieController)  // only when our url starts with '/movies'
routes.use('/casts', castController)
routes.use('/users', userController)
routes.all('*url', (req, res) => {//in the end, bc if we have gone through the abpve controllers and have not rendered anything, we should display 404
    res.render('404');
})

export default routes;