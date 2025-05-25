import express from "express"
import handlebars from "express-handlebars"

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
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res)=> {
    res.render('about')
})

//start express server
app.listen(5000, () => {
    console.log("Server is listening on http://localhost:5000...");
})