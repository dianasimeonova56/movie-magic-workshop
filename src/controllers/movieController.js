import express from 'express'
import movieService from '../services/movieService.js';
import castService from '../services/castService.js';
import { getCategoryOptionsViewData } from '../utils/movieUtils.js';
import { isAuth } from '../middlewares/authMiddleware.js';
import { getErrorMessage } from '../utils/errorUtils.js';

const movieController = express.Router();
// 'movie' comes from the index.js
movieController.get('/create', isAuth, (req, res) => {
    res.render('movie/create');
});

movieController.post('/create', isAuth, async (req, res) => {
    const userId = req.user.id; // get the owner id

    const newMovie = req.body;


    //save movie
    try {
        await movieService.create(newMovie, userId);
        //redirect to home page
        res.redirect('/');
    } catch (err) {

        const categoryOptionsViewData = getCategoryOptionsViewData(newMovie.category);
        red.render('movie/create', {
            error: getErrorMessage(err),
            movie: newMovie,
            categoryOptions: categoryOptionsViewData
        })
    }

});

movieController.get('/:movieId/details', async (req, res) => {
    //get movie id from params
    const movieId = req.params.movieId;

    const userId = req.user?.id; // guest - no id, logged in - userId

    const movie = await movieService.getOne(movieId); // its with populated casta

    const isOwner = movie.owner?.equals(userId);

    res.render('movie/details', { movie, isOwner, pageTitle: "Details" });
});

movieController.get('/search', async (req, res) => {
    //get query string
    const filter = req.query;

    const movies = await movieService.getAll(filter);

    res.render('search', { movies, filter });
});

movieController.get('/:movieId/attach', isAuth, async (req, res) => {
    const movieId = req.params.movieId;

    //get movie
    const movie = await movieService.getOne(movieId);

    // get all casts
    const casts = await castService.getAll({ exclude: movie.casts }); // exclude the casts that are already attached

    // pass casts to template
    res.render('movie/attach', { movie, casts, pageTitle: "Attach" });
});

movieController.post('/:movieId/attach', isAuth, async (req, res) => {
    //get movieid
    const movieId = req.params.movieId;

    //get castid
    const castId = req.body.cast;

    //attach cast to movie
    await movieService.attach(movieId, castId);

    res.redirect(`/movies/${movieId}/details`);

});

movieController.get('/:movieId/delete', isAuth, async (req, res) => {
    const movieId = req.params.movieId;

    await movieService.delete(movieId);

    res.redirect('/');
});


movieController.get('/:movieId/edit', isAuth, async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getOne(movieId);

    const userId = req.user?.id;

    //if owner
    const isOwner = movie.owner?.equals(userId);

    if (!isOwner) {
        //this way we dont store id in the url
        //message is stored only once and then deleted
      return res.dataRedirect('404', {error: "You dont have access to edit this movie!"});
      //return res.render('404', {error: "You dont have access to edit this movie!"})

    }

    const categoryOptionsViewData = getCategoryOptionsViewData(movie.category);


    res.render('movie/edit', {
        pageTitle: 'Edit',
        movie,
        categoryOptions: categoryOptionsViewData
    });
})

movieController.post('/:movieId/edit', isAuth, async (req, res) => {
    const movieId = req.params.movieId;

    const movieData = req.body;

    const userId = req.user?.id;

    await movieService.update(movieId, movieData);

    res.redirect(`/movies/${movieId}/details`);
})

export default movieController;