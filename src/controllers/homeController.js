import express from 'express';
import movieService from '../services/movieService.js';

const homeController = express.Router();
//modular router -> subrouter of the main router
//they take care of the request
//specific for this area - home
//better separation of concerns

//1st layer - controller

homeController.get('/',  async (req, res) => {
    const movies = await movieService.getAll();
    console.log(req.user);
    

    res.render('home', { movies }); // the data goes to the template
});

homeController.get('/about', (req, res) => {
    res.render('about');
});

export default homeController;