import express from 'express'
import movieService from '../services/movieService.js';

const movieController = express.Router();
// 'movie' comes from the index.js
movieController.get('/create', (req, res) => {
    res.render('create');
})

movieController.post('/create', async (req, res) => {
    const newMovie = req.body;

    //save movie
    await movieService.create(newMovie);


    //redirect to home page
    res.redirect('/')

    res.end();
})

movieController.get('/:movieId/details', (req, res) => {
    //get movie id from params
    const movieId = req.params.movieId;

    const movie = movieService.getOne(movieId);

    res.render('details', {movie});
    
})

movieController.get('/search', async (req, res) => {
    //get query string
    const filter = req.query;

    const movies = await movieService.getAll(filter);
    res.render('search', {movies});
})

export default movieController;