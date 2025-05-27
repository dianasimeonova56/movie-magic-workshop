import express from "express"
import handlebars from "express-handlebars"
import { homeController } from "./controllers/homeController"; // modular router

//init express instance
const app = express();

//add static middleware
//every request looks if the request is searching for a static folder
app.use(express.static('./src/public'))

//add and config view engine
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));

//constant in express 

//set default engine
app.set('view engine', 'hbs');

//set default view folder
app.set('views', './src/views')

//config routes
app.use(homeController) // app -> main router, use the modular router

//start express server
app.listen(5000, () => {
    console.log("Server is listening on http://localhost:5000...");
})