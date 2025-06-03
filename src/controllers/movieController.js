import express from 'express'
import movieService from '../services/movieService.js';
import castService from '../services/castService.js';

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

movieController.get('/:movieId/details', async (req, res) => {
    //get movie id from params
    const movieId = req.params.movieId;

    const movie = await movieService.getOne(movieId); // its with populated casta

    //get movie cast
    // const casts = await movieService.getCasts(movieId);

    res.render('movie/details', { movie });

})

movieController.get('/search', async (req, res) => {
    //get query string
    const filter = req.query;

    const movies = await movieService.getAll(filter);
    res.render('search', { movies, filter });
})

movieController.get('/:movieId/attach', async (req, res) => {
    const movieId = req.params.movieId;

    //get movie
    const movie = await movieService.getOne(movieId);

    // get all casts
    const casts = await castService.getAll();

    // pass casts to template
    res.render('movie/attach', { movie, casts });
})

movieController.post('/:movieId/attach', async (req, res) => {
    //get movieid
    const movieId = req.params.movieId;

    //get castid
    const castId = req.body.cast;

    //attach cast to movie
    await movieService.attach(movieId, castId);

    res.redirect(`/movies/${movieId}/details`);

})
export default movieController;