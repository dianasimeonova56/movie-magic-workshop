import express from 'express'

const movieController = express.Router();
// 'movie' comes from the index.js
movieController.get('/create', (req, res) => {
    res.render('create');
})

movieController.post('/create', (req, res) => {
    const newMovie = req.body;
    //save movie

    //redirect to home page

    res.end();
})

export default movieController;