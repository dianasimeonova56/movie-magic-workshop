import express from "express"
import handlebars from "express-handlebars"

//init express instance
const app = express();

//add and config view engine
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));

//set default engine
app.set('view engine', 'hbs');

//config routes
app.get('/', (req, res) => {
    res.render('home', {layout:false});
});

//start express server
app.listen(5000, () => {
    console.log("Server is listening on http://localhost:5000...");
})