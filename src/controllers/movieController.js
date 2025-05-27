import express from 'express'
import movieService from '../services/movieService.js';

const movieController = express.Router();
// 'movie' comes from the index.js
movieController.get('/create', (req, res) => {
    res.render('create');
})

movieController.post('/create', (req, res) => {
    const newMovie = req.body;

    //save movie
    movieService.create(newMovie);


    //redirect to home page
    res.redirect('/')

    res.end();
})

export default movieController;