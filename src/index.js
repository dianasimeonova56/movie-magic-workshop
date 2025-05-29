import express from "express"
import handlebars from "express-handlebars"
import homeController from './controllers/homeController.js'; // modular router
import movieController from "./controllers/movieController.js";

//init express instance
const app = express();

//add static middleware
//every request looks if the request is searching for a static folder
app.use(express.static('./src/public'))

//add body parser
app.use(express.urlencoded()); 
// middleware from express that is a body parser - if there is data in the requests, it reads it and accumulates it in chunks
// now we have req.body 

//add and config view engine
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    helpers: {
        showRating(rating) {
            return '&#x2605'.repeat(Math.floor(rating));
        }
    }
}));

//constant in express 

//set default engine
app.set('view engine', 'hbs');

//set default view folder
app.set('views', './src/views')

//config routes
app.use(homeController) // app -> main router, use the modular router
app.use('/movies', movieController)  // only when our url starts with '/movies'
app.all('*url', (req, res) => {//in the end, bc if we have gone through the abpve controllers and have not rendered anything, we should display 404
    res.render('404');
})

//start express server
app.listen(5000, () => {
    console.log("Server is listening on http://localhost:5000...");
})