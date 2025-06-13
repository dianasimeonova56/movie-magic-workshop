import express from "express"
import handlebars from "express-handlebars"
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { auth } from "./middlewares/authMiddleware.js";
import routes from "./routes.js";
import session from "express-session";
import { tempData } from "./middlewares/tempDataMiddleware.js";

//init express instance
const app = express();

//add static middleware
//every request looks if the request is searching for a static folder
app.use(express.static('./src/public'))

//cookie parser - middleware
app.use(cookieParser())

//add body parser
app.use(express.urlencoded());
// middleware from express that is a body parser - if there is data in the requests, it reads it and accumulates it in chunks
// now we have req.body 

app.use(session({
    secret: 'HVFTXGQAVYTgbjnHYGYUgjhb',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, httpOnly: true }
}))

//add auth middleware
app.use(auth);

app.use(tempData); // store temporary data 

//add and config view engine
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    helpers: {
        showRating(rating) {
            return '&#x2605'.repeat(Math.floor(rating));
        },
        setTitle(title) {
            this.pageTitle = title;
        }
    },
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true
        //allow to use proto properties/methods in hbs to access methods
        // and resolve hbs not dealing correctly with mongoose documents
        //instead of using lean()
    }
}));
//mongoose document - proto base document
//full with methods and properties
// we allow hbs to use them 

//constant in express 
try {
    mongoose.connect('mongodb://localhost:27017', { dbName: 'magic-movies' });
    console.log("Successfully connected to db");

} catch (err) {
    console.log('cannot connect to db');
    console.log(err.message);
}


//set default engine
app.set('view engine', 'hbs');

//set default view folder
app.set('views', './src/views')

// add routes
app.use(routes);


//start express server
app.listen(5000, () => {
    console.log("Server is listening on http://localhost:5000...");
})