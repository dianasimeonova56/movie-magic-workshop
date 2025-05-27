//modular router -> subrouter of the main router
//they take care of the request
//specific for this area - home
//better separation of concerns

import express from 'express'

export const homeController = express.Router();

//config routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res)=> {
    res.render('about')
})